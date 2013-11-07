(function () {

	function hideLoader() {
		$(".loading").hide();
		$("body").css("background", "#369");
		$(".fragment").show();
	}

	function createFragment(data) {
		return '<div class="fragment"> \
					<span class="title">'+ data.caption +'</span> \
					<a href="'+ data.link +'">\
						<img src="'+ data.images.large +'" alt="'+ data.caption +'" />\
					</a> \
				</div>';
	}

	function success(response) {

		$.each(response.data, function(i, v) {
			var fragmentHTML = createFragment(v);
			$('body').prepend(fragmentHTML);
		});

		if($(".fragment").length <= 50) {
			getAjaxPage(response.paging.next);
		} else {
			hideLoader();
		}
	}

	function error(response) {
		var errorBox = $("#errorBox");
		errorBox.show().text(response.status + " | An error has occured: " + response.responseText);
	}

	function getAjaxPage(index) {
		$.ajax({
			url: "http://infinigag.eu01.aws.af.cm/hot/" + index,
			data: null,
			method: "get",
			success: success,
			error: error
		});
	}

	getAjaxPage(0);

}());