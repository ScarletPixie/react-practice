import { useState } from "react";
import { useEffect } from "react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const JokeContent = ({filterBy}) =>
{
	const [setup, setSetup] = useState(null);
	const [delivery, setDelivery] = useState(null);
	const [loading, setLoading] = useState(true);
	let firstLoad = true;
	
	useEffect(() => {
		async function fetchData()
		{
			const MaxRetries = 3;
			for (let i = 0; i < MaxRetries; i++)
			{
				try
				{
					const url = `https://v2.jokeapi.dev/joke/${filterBy ?? 'Any'}`;
					console.log(url);
					const response = await fetch(url);
					if (!response.ok)
						throw new Error("Couldn't get any jokes :c");
					const data = await response.json();
					if (data.error)
						throw new Error(data.message);
					setSetup(data.setup ?? data.joke);
					setDelivery(data.delivery);
					setLoading(false);
					return;
				}
				catch (err)
				{
					setSetup(err.message);
					setLoading(false);
					delay(4000);
					console.log('Retrying....');
					continue ;
				}
			}
		}

		if (firstLoad)
		{
			firstLoad = false;
			fetchData();
		}
	}, [filterBy]);

	if (loading)
		return (<p className="joke-text">LOADING...</p>);

	return (
		<div>
			<p className="joke-text">{setup}</p>
			<p className="joke-text">{delivery}</p>
		</div>
	)
}

export default JokeContent;