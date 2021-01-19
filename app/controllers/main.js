module.exports = {
    GetHomePage: (req, res) => {
        var message = req.flash('error');
        res.status(200).json({
            message: message
        });
    }
}