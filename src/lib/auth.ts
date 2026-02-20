import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: [
        // Repository permissions
        "repo",                    // Full control of private repositories
        "repo:status",            // Access commit status
        "repo_deployment",        // Access deployment status
        "public_repo",            // Access public repositories
        
        // User permissions
        "user",                   // Update ALL user data
        "user:email",            // Access user email addresses
        "user:follow",           // Follow and unfollow users
        
        // Organization permissions
        "admin:org",             // Full control of orgs and teams, read and write org projects
        "write:org",             // Read and write org membership, read and write org projects
        "read:org",              // Read org membership, read org projects
        
        // Public key permissions
        "admin:public_key",      // Full control of user public keys
        "write:public_key",      // Write user public keys
        "read:public_key",       // Read user public keys
        
        // Repository hook permissions
        "admin:repo_hook",       // Full control of repository hooks
        "write:repo_hook",       // Write repository hooks
        "read:repo_hook",        // Read repository hooks
        
        // Organization hook permissions
        "admin:org_hook",        // Full control of organization hooks
        
        // Gist permissions
        "gist",                  // Create gists
        
        // Notification permissions
        "notifications",         // Access notifications
        
        // User GPG key permissions
        "admin:gpg_key",         // Full control of user GPG keys
        "write:gpg_key",         // Write user GPG keys
        "read:gpg_key",          // Read user GPG keys
        
        // Discussion permissions
        "write:discussion",      // Read and write team discussions
        "read:discussion",       // Read team discussions
        
        // Package permissions
        "read:packages",         // Download packages from GitHub Package Registry
        "write:packages",        // Upload packages to GitHub Package Registry
        "delete:packages",       // Delete packages from GitHub Package Registry
        
        // Security events
        "security_events",       // Read and write security events
        
        // Actions permissions
        "workflow",              // Update GitHub Action workflows
        
        // Project permissions (classic)
        "read:project",          // Read access to project boards
        "write:project",         // Write access to project boards
        
        // Enterprise permissions
        "admin:enterprise",      // Full control of enterprises
        "manage_billing:enterprise", // Read and write enterprise billing data
        "read:enterprise",       // Read enterprise profile data
        
        // Audit log permissions
        "read:audit_log",        // Read audit log events
        
        // Copilot permissions
        "copilot",               // Access GitHub Copilot
        
        // Codespace permissions
        "codespace",             // Full control of codespaces
      ],
    },
    slack: {
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      scope: ["chat:write", "users:read.email", "users:read", "team:read"],
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
});
