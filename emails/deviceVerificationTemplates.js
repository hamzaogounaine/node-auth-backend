const getVerificationEmailTemplate = (lang, username, ip, code) => {
    
    // Fallback to English if language is unknown
    const selectedLang = ['en', 'fr', 'ar'].includes(lang) ? lang : 'en';

    // --- Subject Mapping (Required for Nodemailer) ---
    const subjectMap = {
        'en': 'New Device Verification',
        'fr': 'Vérification de Nouvel Appareil',
        'ar': 'التحقق من جهاز جديد'
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
                <h2 style="color: #004a99;">Login Detected from a New Device</h2>
                <p>Hello **${username}** (User),</p>

                <p>We have detected a login attempt to your account from a new device.</p>
                
                <p><strong>Login Details:</strong></p>
                <ul>
                    <li>**IP Address:** <code>${ip}</code></li>
                </ul>
                
                <p>To verify this device and complete the login, please enter the following one-time code on the login screen:</p>
                
                <div style="background-color: #f3f3f3; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="margin: 0; color: #cc0000; letter-spacing: 3px;">${code}</h1>
                </div>

                <p>This code is valid for a limited time. If you did not attempt to log in, please ignore this email or **contact support immediately**.</p>
                
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
                <h2 style="color: #004a99;">Connexion depuis un nouvel appareil détectée</h2>
                <p>Bonjour **${username}** (Utilisateur),</p>

                <p>Nous avons détecté une tentative de connexion à votre compte depuis un nouvel appareil.</p>
                
                <p><strong>Détails de la connexion :</strong></p>
                <ul>
                    <li>**Adresse IP :** <code>${ip}</code></li>
                </ul>
                
                <p>Pour vérifier cet appareil et finaliser la connexion, veuillez saisir le code à usage unique suivant sur l'écran de connexion :</p>
                
                <div style="background-color: #f3f3f3; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="margin: 0; color: #cc0000; letter-spacing: 3px;">${code}</h1>
                </div>

                <p>Ce code est valide pour une durée limitée. Si vous n'avez pas tenté de vous connecter, veuillez ignorer cet e-mail ou **contacter immédiatement le support**.</p>
                
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
                <h2 style="color: #004a99; text-align: right;">تم اكتشاف محاولة تسجيل دخول من جهاز جديد</h2>
                <p>مرحباً بك **${username}** (المستخدم)،</p>

                <p>لقد اكتشفنا محاولة لتسجيل الدخول إلى حسابك من جهاز جديد.</p>
                
                <p><strong>تفاصيل محاولة تسجيل الدخول:</strong></p>
                <ul style="padding-right: 20px; padding-left: 0;">
                    <li>**عنوان IP (بروتوكول الإنترنت):** <code>${ip}</code></li>
                </ul>
                
                <p>للتحقق من هذا الجهاز وإتمام عملية تسجيل الدخول، يرجى إدخال رمز التحقق لمرة واحدة التالي على شاشة تسجيل الدخول:</p>
                
                <div style="background-color: #f3f3f3; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="margin: 0; color: #cc0000; letter-spacing: 3px; direction: ltr;">${code}</h1>
                </div>

                <p>هذا الرمز صالح لمدة محدودة. إذا لم تحاول تسجيل الدخول، يرجى تجاهل هذا البريد الإلكتروني أو **الاتصال بالدعم الفني فوراً**.</p>
                
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

module.exports = getVerificationEmailTemplate;