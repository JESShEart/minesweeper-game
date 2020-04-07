module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true,
    setupFiles: ["<rootDir>/src/testing/__mocks__/browserMocks.js"],
    testURL: "http://localhost:8080",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules"],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)(spec|test).[jt]s?(x)"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/testing/__mocks__/fileMocks.js",
        "\\.(css|less|scss)$": "<rootDir>/src/testing/__mocks__/styleMocks.js",
        "^./style$": "<rootDir>/src/testing/__mocks__/styleMocks.js",
        "^preact$": "<rootDir>/node_modules/preact/dist/preact.min.js",
        "^react$": "preact-compat",
        "^react-dom$": "preact-compat",
        "^create-react-class$": "preact-compat/lib/create-react-class",
        "^react-addons-css-transition-group$": "preact-css-transition-group"
    },
    setupFilesAfterEnv: ["<rootDir>/src/testing/setupTests.ts"]
};
