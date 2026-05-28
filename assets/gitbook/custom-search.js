// Custom search for jekyll-gitbook.
// Splits each page into heading-based sections so results show the section
// (heading / sub-heading) a match belongs to, links straight to that section,
// and lets ESC clear the in-page highlight.
require([
    'gitbook',
    'jquery'
], function(gitbook, $) {
    var MAX_DESCRIPTION_SIZE = 300; // snippet length per result
    var MAX_RESULTS = 50;           // overall result cap
    var MAX_PER_PAGE = 8;           // section results shown per page
    var state = gitbook.state;
    var INDEX_DATA = {};
    var SECTIONS = [];
    var indexLoaded = false;
    var usePushState = (typeof history.pushState !== 'undefined');

    var $body = $('body');

    function throttle(fn, wait) {
        var timeout;
        return function() {
            var ctx = this, args = arguments;
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    fn.apply(ctx, args);
                }, wait);
            }
        };
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function escapeReg(keyword) {
        return String(keyword).replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\/\\])/g, '\\$1');
    }

    // Split one page's rendered HTML into sections keyed by their heading.
    // kramdown emits headings (h1-h6) as flat siblings with auto-generated ids,
    // so we walk the top-level nodes and start a new section at each heading,
    // tracking ancestor headings to build a breadcrumb.
    function buildPageSections(html, title, url) {
        var container = document.createElement('div');
        container.innerHTML = html || '';

        var sections = [];
        var stack = []; // ancestor headings: { level, text }
        var current = { title: title, url: url, anchor: null, heading: null, breadcrumb: [], body: '' };
        sections.push(current);

        Array.prototype.forEach.call(container.childNodes, function(node) {
            if (node.nodeType === 1 && /^H[1-6]$/.test(node.tagName)) {
                var level = parseInt(node.tagName.charAt(1), 10);
                var text = (node.textContent || '').replace(/\s+/g, ' ').trim();
                if (!text) return;
                while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
                current = {
                    title: title,
                    url: url,
                    anchor: node.id || null,
                    heading: text,
                    breadcrumb: stack.map(function(h) { return h.text; }),
                    body: ''
                };
                sections.push(current);
                stack.push({ level: level, text: text });
            } else if (current) {
                var t = node.textContent || '';
                if (t) current.body += ' ' + t;
            }
        });

        sections.forEach(function(s) { s.body = s.body.replace(/\s+/g, ' ').trim(); });
        return sections.filter(function(s) { return s.heading || s.body; });
    }

    function buildIndex(data) {
        SECTIONS = [];
        for (var url in data) {
            if (!data.hasOwnProperty(url)) continue;
            var page = data[url];
            SECTIONS = SECTIONS.concat(buildPageSections(page.body, page.title, page.url || url));
        }
        indexLoaded = true;
    }

    function makeSnippet(text, kw) {
        var idx = text.toLowerCase().indexOf(kw);
        var start = idx > 60 ? idx - 60 : 0;
        var snippet = escapeHtml(text.substr(start, MAX_DESCRIPTION_SIZE));
        if (start > 0) snippet = '…' + snippet;
        if (text.length > start + MAX_DESCRIPTION_SIZE) snippet += '…';
        var safeKw = escapeReg(escapeHtml(kw));
        return snippet.replace(new RegExp('(' + safeKw + ')', 'gi'),
            '<span class="search-highlight-keyword">$1</span>');
    }

    function query(keyword) {
        if (keyword == null || keyword.trim() === '') return;
        var kw = keyword.toLowerCase();
        var results = [];
        var perPage = {};
        var totalMatches = 0;

        for (var i = 0; i < SECTIONS.length; i++) {
            var s = SECTIONS[i];
            var inBody = s.body.toLowerCase().indexOf(kw) !== -1;
            var inHeading = s.heading && s.heading.toLowerCase().indexOf(kw) !== -1;
            if (!inBody && !inHeading) continue;

            totalMatches++;
            perPage[s.url] = perPage[s.url] || 0;
            if (perPage[s.url] >= MAX_PER_PAGE || results.length >= MAX_RESULTS) continue;
            perPage[s.url]++;

            results.push({
                title: s.title,
                heading: s.heading,
                breadcrumb: s.breadcrumb,
                url: s.url,
                anchor: s.anchor,
                body: makeSnippet(inBody ? s.body : s.heading, kw)
            });
        }

        displayResults({
            count: totalMatches,
            shown: results.length,
            query: keyword,
            results: results
        });
    }

    function displayResults(res) {
        var $bookSearchResults = $('#book-search-results');
        var $searchList = $bookSearchResults.find('.search-results-list');
        var $searchTitle = $bookSearchResults.find('.search-results-title');
        var $searchResultsCount = $searchTitle.find('.search-results-count');
        var $searchQuery = $searchTitle.find('.search-query');

        $bookSearchResults.addClass('open');
        $bookSearchResults.toggleClass('no-results', res.count === 0);

        $searchList.empty();
        $searchResultsCount.text(res.count);
        $searchQuery.text(res.query);

        res.results.forEach(function(item) {
            var $li = $('<li>', { 'class': 'search-results-item' });

            var crumbs = [item.title].concat(item.breadcrumb || []);
            $('<div>', { 'class': 'search-result-breadcrumb' })
                .text(crumbs.join(' › '))
                .appendTo($li);

            var href = item.url + '?h=' + encodeURIComponent(res.query) +
                (item.anchor ? '#' + item.anchor : '');
            var $link = $('<a>', {
                'href': href,
                'text': item.heading || item.title,
                'data-is-search': 1
            });
            if ($link[0].href.split('?')[0] === location.href.split('?')[0]) {
                $link[0].setAttribute('data-need-reload', 1);
            }
            $('<h3>').append($link).appendTo($li);

            $('<p>').html(item.body).appendTo($li);
            $li.appendTo($searchList);
        });

        $('.body-inner').scrollTop(0);
    }

    function launchSearch(keyword) {
        $body.addClass('with-search').addClass('search-loading');
        throttle(function() {
            query(keyword);
            $body.removeClass('search-loading');
        })();
    }

    function closeSearch() {
        $body.removeClass('with-search');
        $('#book-search-results').removeClass('open');
    }

    function handleUpdate(target) {
        var keyword = $(target).val();
        if (keyword === undefined || keyword.length === 0) {
            closeSearch();
        } else {
            launchSearch(keyword);
        }
    }

    function loadIndex() {
        var url = state.basePath + '/assets/search_plus_index.json';
        return $.getJSON(url).then(function(data) {
            INDEX_DATA = data;
            buildIndex(data);
        });
    }

    function bindInput(target) {
        $body.on('keyup', target, function(e) {
            if (e.keyCode === 13 && usePushState) {
                var uri = updateQueryString('q', $(this).val());
                history.pushState({ path: uri }, null, uri);
            }
            handleUpdate(target);
        });

        $body.on('click', target, function() {
            if (!indexLoaded) {
                loadIndex().then(function() { handleUpdate(target); });
            }
        });

        $body.on('blur', target, function() {
            if (usePushState) {
                var uri = updateQueryString('q', $(this).val());
                history.pushState({ path: uri }, null, uri);
            }
        });
    }

    // ---- In-page highlight ----------------------------------------------

    function highLightPageInner(keyword) {
        var $page = $('.page-inner');
        if (!$page.length || !$page.mark) return;
        $page.unmark({
            done: function() {
                $page.mark(keyword, {
                    'ignoreJoiners': true,
                    'acrossElements': true,
                    'separateWordSearch': false
                });
                // Let the URL hash handle scrolling when we deep-link to a section;
                // otherwise jump to the first hit.
                if (!location.hash) {
                    setTimeout(function() {
                        var mark = $('mark[data-markjs="true"]');
                        if (mark.length) mark[0].scrollIntoView();
                    }, 100);
                }
            }
        });
    }

    function cleanUrlParams() {
        if (!usePushState) return;
        try {
            var u = new URL(location.href);
            u.searchParams.delete('q');
            u.searchParams.delete('h');
            history.replaceState({ path: u.href }, null, u.href);
        } catch (e) { /* older browser: leave URL as-is */ }
    }

    // Clear in-page marks, close the results panel and strip search params.
    function clearHighlights() {
        var $page = $('.page-inner');
        if ($page.length && $page.unmark) $page.unmark();
        closeSearch();
        $('#book-search-input input, #book-search-input-inside input').val('');
        cleanUrlParams();
    }

    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) clearHighlights(); // ESC
    });

    // ---- URL helpers (preserved from the original plugin) ----------------

    function showResult() {
        if (/\b(q|h)=([^&]+)/.test(location.search)) {
            var type = RegExp.$1;
            var keyword = decodeURIComponent(RegExp.$2);
            if (type === 'q') {
                launchSearch(keyword);
            } else {
                highLightPageInner(keyword);
            }
            $('#book-search-input input').val(keyword);
            $('#book-search-input-inside input').val(keyword);
        }
    }

    function updateQueryString(key, value) {
        value = encodeURIComponent(value);
        var url = window.location.href.replace(/([?&])(?:q|h)=([^&]+)(&|$)/, function(all, pre, v, end) {
            return end === '&' ? pre : '';
        });
        var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');
        var hash;
        if (re.test(url)) {
            if (typeof value !== 'undefined' && value !== null) {
                return url.replace(re, '$1' + key + '=' + value + '$2$3');
            }
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
            return url;
        }
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
            return url;
        }
        return url;
    }

    // ---- Wiring ----------------------------------------------------------

    gitbook.events.on('start', function() {
        loadIndex().then(function() {
            var t1 = '#book-search-input input';
            var t2 = '#book-search-input-inside input';
            if ($(t1).val()) handleUpdate(t1);
            else if ($(t2).val()) handleUpdate(t2);
            else showResult();
        });
        bindInput('#book-search-input input');
        bindInput('#book-search-input-inside input');
        closeSearch();
    });

    gitbook.events.on('page.change', showResult);

    window.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('data-need-reload')) {
            setTimeout(function() { location.reload(); }, 100);
        }
    }, true);
});
