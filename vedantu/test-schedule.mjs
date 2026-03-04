import { execSync } from "child_process";
import path from "path";

try {
  console.log("Testing schedule page compilation...");
  execSync("npx tsc --noEmit --project tsconfig.json", {
    cwd: path.join(process.cwd()),
    stdio: "pipe",
  });
  console.log("✅ TypeScript compilation successful");
} catch (error) {
  console.error("❌ TypeScript compilation failed:");
  console.error(error.stdout ? error.stdout.toString() : error.message);
  process.exit(1);
}
