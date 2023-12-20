
interface ImportMeta {
  /**
   * While it can sometimes be painful to maintain both a `.env` file and a
   * set of type declarations for your env variables, this approach offers
   * some nice benefits like type checking and autocompletion in your IDE.
   * For a small project it might be easier to just remove this file and
   * opt-out of type checking entirely, but for larger codebases this can
   * be a nice way to ensure correctness throughout your application.
   */
  readonly env: {
    VITE_VC_API_BASE_URL: string;
    VITE_VC_API_KEY: string;
  }
}
