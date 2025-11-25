package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${app.email.username}")
    private String emailUsername;

    @Value("${app.email.password}")
    private String emailPassword;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        try {
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");

            Session session = Session.getInstance(props, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(emailUsername, emailPassword);
                }
            });

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(emailUsername));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject("Password Reset Request - Schedio");

            String resetLink = frontendUrl + "/reset-password?token=" + resetToken;
            String htmlContent = """
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #2c3e50;">Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>We received a request to reset your password for your Schedio account.</p>
                        <p>Click the button below to reset your password:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="%s" style="background-color: #3498db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                        </div>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #3498db;">%s</p>
                        <p><strong>This link will expire in 1 hour.</strong></p>
                        <p>If you didn't request this password reset, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        <p style="font-size: 12px; color: #666;">Best regards,<br>The Schedio Team</p>
                    </div>
                </body>
                </html>
                """.formatted(resetLink, resetLink);

            message.setContent(htmlContent, "text/html; charset=utf-8");

            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}