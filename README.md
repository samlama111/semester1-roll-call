# Roll-call system for DoLS

## Prerequisites 

Node (v14+) 

Mobile client
- globally installed `expo-cli` Node package
- Expo Go App installed on your phone

if having issues with symlinks and the 'shared' folder on Windows:
- enable "Developer Mode" in Windows 10/11 - gives `mklink` permissions
- run `git config --global core.symlinks true` - enables symlinks in Git on Windows
- if still having issues, make sure `git config core.symlinks` returns true in the repository directory 
  - if not, run `git config core.symlinks true` (without the `--global` flag)

## Available Scripts
Building
- `npx lerna bootstrap` 

Testing:
- `npx lerna run test`
