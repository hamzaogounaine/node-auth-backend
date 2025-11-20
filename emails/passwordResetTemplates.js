const getPasswordResetEmailTemplate = (lang, username, ip, resetLink) => {
    
    // Fallback to English if language is unknown
    const selectedLang = ['en', 'fr', 'ar'].includes(lang) ? lang : 'en';

    // --- Subject Mapping (Required for Nodemailer) ---
    const subjectMap = {
        'en': 'Password Reset Request',
        'fr': 'Demande de Réinitialisation de Mot de Passe',
        'ar': 'طلب إعادة تعيين كلمة المرور'
    };
    
    const subject = subjectMap[selectedLang];

    // --- HTML Template Logic (Using JS Template Literals) ---

    // 🇬🇧 ENGLISH Template (LTR)
    const enTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #004a99;">Reset Your Password</h2>
                <p>Hello **${username}** (User),</p>

                <p>We received a request to reset the password for your account. If you made this request, click the button below to choose a new password:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #cc0000; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                        Reset Password
                    </a>
                </div>

                <p>This request was initiated from **IP Address**: <code>${ip}</code>.</p>
                
                <p>This link will expire soon for security reasons. **If you did not request a password reset, you can safely ignore this email.** Your password will remain unchanged.</p>
                
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #888;">This is an automated email. Please do not reply.</p>
            </div>
        </body>
        </html>
    `;

    // 🇫🇷 FRENCH Template (LTR)
    const frTemplate = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #004a99;">Réinitialisez Votre Mot de Passe</h2>
                <p>Bonjour **${username}** (Utilisateur),</p>

                <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous êtes à l'origine de cette demande, cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #cc0000; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                        Réinitialiser le mot de passe
                    </a>
                </div>

                <p>Cette demande a été initiée depuis l'**Adresse IP** : <code>${ip}</code>.</p>
                
                <p>Ce lien expirera bientôt pour des raisons de sécurité. **Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail en toute sécurité.** Votre mot de passe restera inchangé.</p>
                
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #888;">Ceci est un e-mail automatique. Veuillez ne pas y répondre.</p>
            </div>
        </body>
        </html>
    `;

    // 🇦🇪 ARABIC Template (RTL)
    const arTemplate = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>${subject}</title>
        </head>
        <body style="font-family: 'Tahoma', 'Arial', sans-serif; line-height: 1.6; direction: rtl; text-align: right;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #004a99; text-align: right;">أعد تعيين كلمة المرور الخاصة بك</h2>
                <p>مرحباً بك **${username}** (المستخدم)،</p>

                <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. إذا كنت من قام بهذا الطلب، انقر على الزر أدناه لاختيار كلمة مرور جديدة:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #cc0000; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; direction: ltr;">
                        إعادة تعيين كلمة المرور
                    </a>
                </div>

                <p>تم بدء هذا الطلب من **عنوان IP (بروتوكول الإنترنت)**: <code>${ip}</code>.</p>
                
                <p>سينتهي صلاحية هذا الرابط قريباً لأسباب أمنية. **إذا لم تطلب إعادة تعيين كلمة مرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان.** ستبقى كلمة المرور الخاصة بك دون تغيير.</p>
                
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #888; text-align: right;">هذا بريد إلكتروني آلي. يرجى عدم الرد عليه.</p>
            </div>
        </body>
        </html>
    `;

    // --- Return the correct template string ---
    switch (selectedLang) {
        case 'fr':
            return { html: frTemplate, subject: subject };
        case 'ar':
            return { html: arTemplate, subject: subject };
        case 'en':
        default:
            return { html: enTemplate, subject: subject };
    }
};

// Make sure you export this function too, or your mail service is useless
module.exports = { getPasswordResetEmailTemplate };