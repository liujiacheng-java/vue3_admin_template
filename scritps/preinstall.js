if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository recommends using pnpm as the package manager. ` +
      `npm is allowed here, but pnpm is preferred for the best project setup.\u001b[39m\n`,
  )
}
