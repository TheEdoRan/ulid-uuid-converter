import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	rootDir: "./src",
	testMatch: ["**/__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
};

export default config;
