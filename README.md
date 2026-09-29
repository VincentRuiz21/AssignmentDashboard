# Assignment Dashboard — Render

## Deploy on Render

1. Create a GitHub repository and upload this folder.
2. In Render, choose **New → Web Service**.
3. Connect the GitHub repository.
4. Runtime: Node.
5. Build command: `npm install`
6. Start command: `npm start`
7. Choose the **Free** instance.
8. Deploy.

Render will provide a URL such as:

`https://your-assignment-dashboard.onrender.com`

Open that URL and paste your ICS calendar link.

## Important

The backend retrieves the ICS calendar server-side, which avoids the browser CORS problem.

The dashboard stores assignment status locally in the browser. It does not store your ICS URL or calendar contents on the server.

## Security note

This proxy accepts an arbitrary HTTP(S) URL. For a private/personal deployment, this is acceptable for a small prototype, but a production deployment should restrict allowed calendar hosts (for example, your school's Canvas domain) to reduce SSRF risk.
