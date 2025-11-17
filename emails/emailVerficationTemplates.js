const getAccountVerificationEmailTemplate = (lang, username, verificationLink) => {
    
    // Fallback to English if language is unknown
    const selectedLang = ['en', 'fr', 'ar'].includes(lang) ? lang : 'en';

    // --- Subject Mapping (Required for Nodemailer) ---
    const subjectMap = {
        'en': 'Action Required: Verify Your Email Address',
        'fr': 'Action Requise : Vérifiez Votre Adresse E-mail',
        'ar': 'إجراء مطلوب: تحقق من عنوان بريدك الإلكتروني'
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
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; text-align: left;">
                <h2 style="color: #004a99; text-align: center;">Verify Your Email Address</h2>
                <p>Hello **${username}** (User),</p>

                <p>Thank you for registering with us! To complete your account setup and start using all the features, please click the button below to verify your email address:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" 
                       style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none; font-weight: bold;">
                        Verify My Email
                    </a>
                </div>

                <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
                <p style="word-break: break-all; font-size: 12px; color: #555;">${verificationLink}</p>
                
                <p>This link is valid for a limited time. If you did not sign up for an account, you can safely ignore this email.</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 25px;">
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
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; text-align: left;">
                <h2 style="color: #004a99; text-align: center;">Vérifiez Votre Adresse E-mail</h2>
                <p>Bonjour **${username}** (Utilisateur),</p>

                <p>Merci de vous être inscrit chez nous ! Pour finaliser la configuration de votre compte et commencer à utiliser toutes les fonctionnalités, veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail :</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" 
                       style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none; font-weight: bold;">
                        Vérifier Mon E-mail
                    </a>
                </div>

                <p>Si le bouton ci-dessus ne fonctionne pas, veuillez copier et coller le lien suivant dans votre navigateur Web :</p>
                <p style="word-break: break-all; font-size: 12px; color: #555;">${verificationLink}</p>
                
                <p>Ce lien est valable pour une durée limitée. Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail en toute sécurité.</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 25px;">
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
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; text-align: right;">
                <h2 style="color: #004a99; text-align: center;">تحقق من عنوان بريدك الإلكتروني</h2>
                <p>مرحباً بك **${username}** (المستخدم)،</p>

                <p>شكراً لتسجيلك معنا! لإكمال إعداد حسابك والبدء في استخدام جميع الميزات، يرجى النقر على الزر أدناه للتحقق من عنوان بريدك الإلكتروني:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" 
                       style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4CAF50; border-radius: 5px; text-decoration: none; font-weight: bold; direction: ltr;">
                        التحقق من بريدي الإلكتروني
                    </a>
                </div>

                <p>إذا لم يعمل الزر أعلاه، يرجى نسخ الرابط التالي ولصقه في متصفح الويب الخاص بك:</p>
                <p style="word-break: break-all; font-size: 12px; color: #555; direction: ltr; text-align: left;">${verificationLink}</p>
                
                <p>هذا الرابط صالح لمدة محدودة. إذا لم تقم بالتسجيل للحصول على حساب، يمكنك تجاهل هذا البريد الإلكتروني بأمان.</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 25px;">
                <p style="font-size: 12px; color: #888;">هذا بريد إلكتروني آلي. يرجى عدم الرد عليه.</p>
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

module.exports = getAccountVerificationEmailTemplate;