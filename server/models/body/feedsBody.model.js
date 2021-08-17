class FeedsBody{
    static postFeedBody(req){
        const body = {
            feedText: req.body.feedText,
            userId: req.body.userId,
        }

        return body;
    }
}

export default FeedsBody;