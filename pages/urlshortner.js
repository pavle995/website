import Link from 'next/link'
import {useState} from 'react';


export default function UrlShortner() {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")


    function handleClick() {
        try {
            console.log("very beggining")
            let payload = new URLSearchParams();
            console.log("Test 1")
            payload.append('url', url)
            console.log("Test 2")
            fetch(`http://ec2-15-161-149-189.eu-south-1.compute.amazonaws.com/short`,
                {
                    method: 'POST',
                    body: payload
                })
                .then((res) => {
                    const r = res.json()
                    console.log("Test 3")
                    console.log(r)
                    return r
                })
                .then((data) => {
                    console.log(data)
                    const shortUrl = "http://ec2-15-161-149-189.eu-south-1.compute.amazonaws.com/".concat(data.shortUrl)
                    setShortUrl(shortUrl)
                })
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(event) {
        setUrl(event.target.value)
    }

    return (<div className="grid h-screen place-items-center">
                <div>
                    <div>
                        <div>
                            <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long URL</label>
                            <input type="url" id="url" value={url} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://www.example.com" required />
                        </div>
                        <button onClick={() => {handleClick()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                    <label>
                        Short url:
                        <br></br>
                        <Link  href={shortUrl} className="no-underline hover:underline text-blue-700">{shortUrl}</Link>
                    </label>
                </div>
    </div>)
}