// Set a user's 4-digit login PIN from the command line, e.g. for the admin account:
//   node server/set-pin.js admin@example.com
// The PIN is read from the NEW_PIN environment variable, or prompted for.
// This also clears any PIN lockout and the "must change PIN" flag.
import bcrypt from "bcryptjs";
import readline from "readline";
import sql from "./db.js";
import { isValidPin, isWeakPin } from "./utils.js";

async function promptHidden(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl._writeToOutput = (text) => {
    if (text.includes(question)) rl.output.write(text);
  };
  const answer = await new Promise((resolve) => rl.question(question, resolve));
  rl.close();
  process.stdout.write("\n");
  return answer;
}

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) {
    console.error("Usage: node server/set-pin.js <email>");
    process.exit(1);
  }

  const pin = (process.env.NEW_PIN || (await promptHidden(`New 4-digit PIN for ${email}: `))).trim();
  if (!isValidPin(pin)) {
    console.error("❌ PIN must be exactly 4 digits.");
    process.exit(1);
  }
  if (isWeakPin(pin)) {
    console.error("❌ That PIN is too easy to guess. Avoid repeated digits (1111) and runs (1234).");
    process.exit(1);
  }

  const hash = await bcrypt.hash(pin, 12);
  const updated = await sql`
    UPDATE users
    SET pin_hash = ${hash}, must_change_pin = FALSE, failed_pin_attempts = 0, pin_locked_until = NULL, updated_at = NOW()
    WHERE LOWER(email) = ${email}
    RETURNING id, role
  `;

  if (updated.length === 0) {
    console.error(`❌ No user found with email ${email}`);
    process.exit(1);
  }

  console.log(`✅ PIN set for ${email} (role: ${updated[0].role})`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
