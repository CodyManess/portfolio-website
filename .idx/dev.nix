{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.nodejs_latest
  ];
  idx.extensions = [
    "oxc.oxc-vscode"
    "bradlc.vscode-tailwindcss"
    "editorconfig.editorconfig"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
