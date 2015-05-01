function convertTime(duration) { 
	var v_minutes = parseInt(duration / 60, 10) % 60;
	var v_seconds = duration % 60;
	var v_playtime = (v_minutes < 10 ? "0" + v_minutes : v_minutes) + ":" + (v_seconds < 10 ? "0" + v_seconds : v_seconds);
	return v_playtime;
}

function stripQuotes(str) {
	return (str=str.replace('<br/>',''));
}

function loadVideo(id) {
	var el = '#video #vimeo',
		api = 'https://vimeo.com/api/v2/video/'+id+'.json';

	$(el).html('');
	
	$.ajax({
		url: api,
		type: 'get',
		timeout: 1500,
		complete: function(data) {
			var video = JSON.parse(data.responseText);
			
			$(el).append('<div class="video"><iframe src="http://player.vimeo.com/video/'+ video[0].id +'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;color=ffffff" class="vimeo-iframe" color="ffffff" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen class="vimeo-iframe"></iframe></div><div class="content"><h1 class="single-video-title">'+video[0].title+'</h1><p class="v-duration">Duration: '+convertTime(video[0].duration)+'</p><p class="v-desc">'+stripQuotes(video[0].description)+'</p>');
			
			var ratio = .567,
				livewidth = $('.vimeo-iframe').width();
			
			$('.vimeo-iframe').attr("height", livewidth*ratio);

			$(window).resize(function(){
				livewidth = $('.vimeo-iframe').width();
				$('.vimeo-iframe').attr("height", livewidth*ratio);
			});
		}
	});
}

function loadAlbum(id, title) {
	var request = 'album',
		vids = [],
		el = '#album .video-list',
		api = 'https://vimeo.com/api/v2/'+request+'/'+id+'/videos.json';
	
	$(el).html('');

	$.ajax({
		url: api,
		type: 'get',
		timeout: 1500,
		complete: function(data){
			var video = JSON.parse(data.responseText);
			$.each(video, function(key, value) {
				vids[key] = $('<li class="video-list-item"><a href="#video" data-videoid="'+value.id+'" class="thumb"><div class="video-wrapper"><img src="'+value.thumbnail_medium+'" class="video-list-thumb" alt="'+value.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+value.title+'</h2><p class="video-list-desc">'+value.description+'</p></div></a></li>').hide();
			});

			renderVids(vids, el);
			
			$('.album-content .page-title').html(title);
		}
	});
}

function renderVids(vids, el) {
	$.each(vids, function(i){
		setTimeout(function(){
			$(el).append(vids[i].fadeIn(200));
		}, 120 * i );
	});
}

function featured() {
	var request = 'channel',
		id = '380729',
		el = '#home .video-list',
		vids = [],
		api = 'https://vimeo.com/api/v2/'+request+'/'+id+'/videos.json';
	
	//$(el).html('');

	$.ajax({
		url: api,
		type: 'get',
		timeout: 1500,
		complete: function(data){
			var video = JSON.parse(data.responseText);
			$.each(video, function(key, value) {
				vids[key] = $('<li class="video-list-item"><a href="#video" data-videoid="'+value.id+'" class="thumb"><div class="video-wrapper"><img src="'+value.thumbnail_medium+'" class="video-list-thumb" alt="'+value.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+value.title+'</h2><p class="video-list-desc">'+value.description+'</p></div></a></li>').hide();
			});

			renderVids(vids, el);
		}
	});
}

function programs() {
	var el = ('#programs .video-list'),
		vids = [],
		albums = [
			'1913345',
			'1926531',
			'1950644',
			'1938422',
			'2331860',
			'1910016',
			'1913424',
			'1926451'
		];

	$(el).html('');

	$.each(albums, function(key, value) {
		$.ajax({
			url: 'https://vimeo.com/api/v2/album/'+albums[key]+'/info.json',
			type: 'get',
			timeout: 1500,
			complete: function(data) {
				var album = JSON.parse(data.responseText);
				vids[key] = $('<li class="video-list-item"><a href="#album" data-albumid="'+album.id+'" data-albumtitle="'+album.title+'" class="thumb"><div class="video-wrapper"><img src="'+album.thumbnail_medium+'" class="video-list-thumb" alt="'+album.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+album.title+'</h2><p class="video-list-desc">'+album.description+'</p></div></a></li>').hide();

				setTimeout(function(){
					$(el).append(vids[key].fadeIn(200));
				}, 120 * key );
			}
		});
	});
}

function talkshows() {
	var el = ('#talkshows .video-list'),
		vids = [],
		albums = [
			'2095934',
			'2095787',
			'1926483',
			'1926484',
			'1926481',
			'1926480',
			'1926492',
			'1926477',
			'1926478',
			'1926475',
			'1926485'
		];
	
	$(el).html('');

	$.each(albums, function(key, value) {
		$.ajax({
			url: 'https://vimeo.com/api/v2/album/'+albums[key]+'/info.json',
			type: 'get',
			timeout: 1500,
			complete: function(data) {
				var album = JSON.parse(data.responseText);
				vids[key] = $('<li class="video-list-item"><a href="#album" data-albumid="'+album.id+'" data-albumtitle="'+album.title+'" class="thumb"><div class="video-wrapper"><img src="'+album.thumbnail_medium+'" class="video-list-thumb" alt="'+album.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+album.title+'</h2><p class="video-list-desc">'+album.description+'</p></div></a></li>').hide();
				
				setTimeout(function(){
					$(el).append(vids[key].fadeIn(200));
				}, 120 * key );
			}
		});
	});
}

function shorts() {
	var el = ('#shorts .video-list'),
		vids = [],
		albums = [
			'1926503',
			'2036669',
			'3089096',
			'2124648',
			'1989264',
			'1926418',
			'1982123',
			'1973727',
			'1956215',
			'1956222',
			'2057171',
			'1910018',
			'1915716',
			'1915707',
			'1914773',
			'1914812',
			'1982302'
		];
	
	$(el).html('');

	$.each(albums, function(key, value) {
		$.ajax({
			url: 'https://vimeo.com/api/v2/album/'+albums[key]+'/info.json',
			type: 'get',
			timeout: 1500,
			complete: function(data) {
				var album = JSON.parse(data.responseText);
				
				vids[key] = $('<li class="video-list-item"><a href="#album" data-albumid="'+album.id+'" data-albumtitle="'+album.title+'" class="thumb"><div class="video-wrapper"><img src="'+album.thumbnail_medium+'" class="video-list-thumb" alt="'+album.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+album.title+'</h2><p class="video-list-desc">'+album.description+'</p></div></a></li>').hide();
				
				setTimeout(function(){
					$(el).append(vids[key].fadeIn(200));
				}, 120 * key );
			}
		});
	});
}

function citybeat() {
	var id = '1926503',
		el = '#citybeat .video-list',
		vids = [],
		api = 'https://vimeo.com/api/v2/album/'+id+'/videos.json';

	$(el).html('');

	$.ajax({
		url: api,
		type: 'get',
		timeout: 1500,
		complete: function(data){
			var video = JSON.parse(data.responseText);

			$.each(video, function(key, value) {
				vids[key] = $('<li class="video-list-item"><a href="#video" data-videoid="'+value.id+'" class="thumb"><div class="video-wrapper"><img src="'+value.thumbnail_medium+'" class="video-list-thumb" alt="'+value.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+value.title+'</h2><p class="video-list-desc">'+value.description+'</p></div></a></li>').hide();
			});
			
			renderVids(vids, el);
		}
	});
}

function meetings() {
	var albums = [
		'1926474',
		'1923922',
		'1923921'],
		el = ('#meetings .video-list'),
		vids = [];

	$(el).html('');
	
	$.each(albums, function(key, value) {
		$.ajax({
			url: 'https://vimeo.com/api/v2/album/'+albums[key]+'/info.json',
			type: 'get',
			timeout: 1500,
			complete: function(data) {
				var album = JSON.parse(data.responseText);
				
				vids[key] = $('<li class="video-list-item"><a href="#album" data-albumid="'+album.id+'" data-albumtitle="'+album.title+'" class="thumb"><div class="video-wrapper"><img src="'+album.thumbnail_medium+'" class="video-list-thumb" alt="'+album.title+'"></div><div class="video-list-item-content"><h2 class="video-list-title">'+album.title+'</h2><p class="video-list-desc">'+album.description+'</p></div></a></li>').hide();
				
				setTimeout(function(){
					$(el).append(vids[key].fadeIn(200));
				}, 120 * key );

			}
		});
	});
}

/* Pageload functions */
$(function() {
	$("[data-role=header],[data-role=footer]").toolbar().enhanceWithin();
	$("[data-role=panel]").panel().enhanceWithin();
});

$(document).on("pagecreate", function (){
	$("[data-role=panel]").one("panelbeforeopen", function () {
		var height = $.mobile.pageContainer.pagecontainer("getActivePage").outerHeight();
		$(".ui-panel-wrapper").css("height", height + 1);
	});
});

$(document).on('pageshow', '#video', function(){
	loadVideo(localStorage.getItem("video_id"));
});

$(document).on('pagehide', '#video', function(){ 
    $('#video #vimeo').empty();
});

$(document).on('pageshow', '#album', function(){
	loadAlbum(localStorage.getItem("album_id"), localStorage.getItem("album_title"));
});

$(document).on('pagehide', '#album', function(){ 
    $('#album .video-list').empty();
});

$(document).on('pagehide', '#home', function(){ 
    $('#home .video-list').empty();
});

$(document).on('pageshow', '#home', function(){
	featured();
	$('#home').trigger('create');
});

$(document).on('pageshow', '#live',  function(){
	var ratio = 1.78;
	var livewidth = $('.container').width();
	$('.livestream').attr("height", livewidth/ratio);

	$(window).resize(function(){
		var ratio = 1.78;
		var livewidth = $('.container').width();
		$('.livestream').attr("height", livewidth/ratio);
	});
});

$(document).on('pageshow', '#programs', function(){
	programs();
	$('#programs').trigger('create');
});

$(document).on('pagehide', '#programs', function(){ 
    $('#programs .video-list').empty();
});

$(document).on('pageshow', '#talkshows', function(){
	talkshows();
	$('#talkshows').trigger('create');
});

$(document).on('pagehide', '#talkshows', function(){ 
    $('#talkshows .video-list').empty();
});

$(document).on('pageshow', '#shorts', function(){
	shorts();
	$('#shorts').trigger('create');
});

$(document).on('pagehide', '#shows', function(){ 
    $('#shows .video-list').empty();
});

$(document).on('pageshow', '#citybeat', function(){
	citybeat();
	$('#citybeat').trigger('create');
});

$(document).on('pagehide', '#citybeat', function(){ 
    $('#citybeat .video-list').empty();
});

$(document).on('pageshow', '#meetings', function(){
	meetings();
	$('#meetings').trigger('create');
});

$(document).on('pagehide', '#meetings', function(){ 
    $('#meetings .video-list').empty();
});

$(document).on('click', ".thumb", function(e) {
	if ($(this).data('videoid')) {
		localStorage.setItem("video_id", $(this).data('videoid'));
	}
	if ($(this).data('albumid')) {
		localStorage.setItem("album_id", $(this).data('albumid'));
	}
	if ($(this).data('albumtitle')) {
		localStorage.setItem("album_title", $(this).data('albumtitle'));
	}
});

$(document).on('click', ".external", function(e) {
	e.preventDefault();
	var targetURL = $(this).attr("href");
	window.open(targetURL, "_system");
});