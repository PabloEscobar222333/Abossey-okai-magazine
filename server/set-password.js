// Set a user's password from the command line, e.g. to rotate the admin password:
//   node server/set-password.js admin@example.com
// The new password is read from the NEW_PASSWORD environment variable, or prompted for.
import bcrypt from "bcryptjs";
import readline from "readline";
import sql from "./db.js";

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
    console.error("Usage: node server/set-password.js <email>");
    process.exit(1);
  }

  const password = process.env.NEW_PASSWORD || (await promptHidden(`New password for ${email}: `));
  if (!password || password.length < 10) {
    console.error("❌ Password must be at least 10 characters.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const updated = await sql`
    UPDATE users SET password_hash = ${hash}, updated_at = NOW()
    WHERE LOWER(email) = ${email}
    RETURNING id, role
  `;

  if (updated.length === 0) {
    console.error(`❌ No user found with email ${email}`);
    process.exit(1);
  }

  console.log(`✅ Password updated for ${email} (role: ${updated[0].role})`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
