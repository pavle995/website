
export default async function handler(req, res) {
    try {
        var input = JSON.parse(req.body)
        const payload = new URLSearchParams();
        payload.append('url', input.url)
		const apiRes = await fetch(`http://ec2-15-161-149-189.eu-south-1.compute.amazonaws.com/short`,
            {
                method: 'POST',
                body: payload
            });
		const data = await apiRes.json();
        const shortUrl = "http://ec2-15-161-149-189.eu-south-1.compute.amazonaws.com/".concat(data.shortUrl)
        console.log(shortUrl)
        res.status(200).json({url: shortUrl})
    } catch (err) {
        console.log(err)
    }
}