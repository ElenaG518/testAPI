const GITHUB_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
	console.log(`display searchTerm from getDataFromApi ${searchTerm}`);
	const query = {
		part: 'snippet',
		key: 'AIzaSyDE2RS2B27KuUp-G6TWpRFtLpySC36Zf3c',
		q: `${searchTerm} in:name`,
	};
	$.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(result, index) {
	console.log(result);
	return `
    <div class="image">
     <a href="https://www.youtube.com/watch?v=${result.id
				.videoId}" target="_blank">
      <img src="${result.snippet.thumbnails.medium.url}"
     alt="${result.snippet.title}" data-index="${index}"></a>
     <p><a href="https://www.youtube.com/channel/${result.snippet
				.channelId}" target="_blank">more from this channel </a></p>
     </div>
   
    `;
}

function renderLightBox(event) {
	$('.js-search-results').on('click', 'img', event => {
		console.log('renderLightBox has ran');
		let ind = $('.js-search-results')
			.find(event.currentTarget)
			.attr('data-index');

		console.log(ind);
	});
}

function displayGitHubSearchData(data) {
	const results = data.items.map((item, index) => renderResult(item, index));
	console.log(`display results ${results}`);

	$('.js-search-results').html(results);
}

function watchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		console.log(`watch submit function has a search for ${query}`);
		// clear out the input
		queryTarget.val('');
		getDataFromApi(query, displayGitHubSearchData);
	});
}

function start() {
	renderLightBox();
	watchSubmit();
}

$(start);
