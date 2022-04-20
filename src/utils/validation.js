
function VALIDATION( step , res ) {
    switch (step) {
        case 100:
            res.json({ success: false , error: { msg: "Please fill in the entire form" } });
            break;
        case 200:
            res.json({ success: false,  error: { msg: "Passwords do not match" } });
            break
        case 300:
            res.json({ success: false, error: { msg: "Your password needs to be six characters long" }});
            break;
        case 400:
            res.json({ success: false, error: { msg: "email is already signed up" } });
            break
        case 500:
            res.json({ success: false, error: { msg: "Username is already taken" } });
            break
        default:
            console.log(`Sorry, we are out of ${expr}.`);
    }
}

module.exports = VALIDATION;