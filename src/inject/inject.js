const observer = new MutationSummary({
	callback: handleChanges,
	queries: [{ element: '.PAPAGETITLE' }]
});
styleTweaks();

function handleChanges(summary) {
	const changes = summary[0];
	changes.added.forEach(function(changeEl) {
		if($(changeEl).text() == "Search Results") {
			addRatings()
		}
	});
}
function addRatings(){
	const rmp_uc = rmp("University of Cincinnati");
	$('span[id^="MTG_INSTR"]').each(function(index){
		const prof_this = this;
		rmp_uc.get($(this).text(), function(resp){
			if (resp) {
				const quality = resp.quality;
				const url = resp.url;
				var color = "";
				if (parseFloat(quality) >= 3.5) {
					color = "#b2ce3a";
				}
				else if (parseFloat(quality) >= 2.5 && parseFloat(quality) < 3.5) {
					color = "#f7cc1e";
				}
				else {
					color = "#e01743";
				}
				$(prof_this).append(`<a style="text-decoration: none;" href="${url}" target="_blank" title="Top Tag: ${resp.topTag}"><span class="box" style="background-color: ${color}">${quality}</span></a>`);
			}
			else {
				rmp.get($(prof_this).text(), function(resp) {
					if (resp) {
						const quality = resp.quality;
						const url = resp.url;
						var color = "";
						if (parseFloat(quality) >= 3.5) {
							color = "#b2ce3a";
						}
						else if (parseFloat(quality) >= 2.5 && parseFloat(quality) < 3.5) {
							color = "#f7cc1e";
						}
						else {
							color = "#e01743";
						}
						$(prof_this).append(`<a style="text-decoration: none;" href="${url}" target="_blank" title="Top Tag: ${resp.topTag}"><span class="box" style="background-color: ${color}">${quality}</span></a><abbr style="margin-left:5px" title="This professors school did not exactly match UC, this may be because they taught at a different school or it's a wrong match. University: ${resp.university}">?</abbr>`);
						console.log(resp);
					}
				});
			}
		});
	});
}
function styleTweaks() {
	// Remove course number 'is exactly' box and allows tabbing right to it
	$("div[id='win0divSSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1']").parent().remove();
	$("div[id='SSR_CLSRCH_WRK_CATALOG_NBR$1']").attr('tabindex', 114);
}