const JokeFilter = ({setFilter}) =>
{
	function handleChange (event)
	{
		setFilter(event.target.value);
	}

	return (
		<div>
			<label htmlFor="options">Choose an option:</label>
			<select id="options" onChange={handleChange}>
				<option value="Any">Any</option>
				<option value="Programming">Programming</option>
				<option value="Dark">Dark</option>
				<option value="Pun">Pun</option>
			</select>
		</div>
	);
}

export default JokeFilter