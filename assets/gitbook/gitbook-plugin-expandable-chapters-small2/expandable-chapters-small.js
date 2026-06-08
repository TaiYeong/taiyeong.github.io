require(['gitbook', 'jQuery'], function (gitbook, $) {
    var PLUGIN = 'expandable-chapter-small2',
        TOGGLE_CLASSNAME = 'expanded',
        CHAPTER = '.chapter',
        // ARTICLES = '.articles',
        ARTICLES = '.chapter ul',
        FOLDABLE = '.chapter, .chapter li',
        ARTICLE_CHILDREN = 'ul',
        TRIGGER_TEMPLATE = '<i class="exc-trigger fa"></i>',
        LS_NAMESPACE = 'expChapters';

    var init = function () {
        // adding the trigger element to each ARTICLES parent and binding the event
        var config = gitbook.state.config.pluginsConfig || {};
        var articlesExpand = false;
        if (config && config[PLUGIN]) {
            articlesExpand = config[PLUGIN].articlesExpand || false;
        }
        if (articlesExpand) {
            $(ARTICLES)
                .parent(CHAPTER)
                .find(ARTICLE_CHILDREN)
                .prev()
                .css('cursor', 'pointer')
                .on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $chapter = $(e.target).closest(FOLDABLE);
                    toggle($chapter);
                    scrollToChapterAnchor($chapter);
                })
                .append(TRIGGER_TEMPLATE);
        } else {
            $(ARTICLES)
                .parent(CHAPTER)
                .find(ARTICLE_CHILDREN)
                .prev()
                .append(
                    $(TRIGGER_TEMPLATE)
                        .on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var $chapter = $(e.target).closest(FOLDABLE);
                            toggle($chapter);
                            scrollToChapterAnchor($chapter);
                        })
                );
        }

        // clicking the chapter title text (the <a>) should expand (never collapse)
        // its sub-list in addition to the native anchor-jump / mobilePageScrollToAnchor
        // flow that the <a>'s own href/onclick already provide. We intentionally do NOT
        // call preventDefault/stopPropagation here so that flow continues to fire.
        $(ARTICLES)
            .parent(CHAPTER)
            .find(ARTICLE_CHILDREN)
            .prev('a')
            .on('click', function (e) {
                if ($(e.target).hasClass('exc-trigger')) {
                    return; // the trigger's own handler already handled this and stopped propagation
                }
                expand($(this).closest(FOLDABLE));
            });

        expand(lsItem());

        // optionally expand current selected chapter with its parents (opt-in via config)
        var config = gitbook.state.config.pluginsConfig || {};
        var expandActive = config && config[PLUGIN] && config[PLUGIN].expandActive;
        if (expandActive) {
            var activeChapter = $(CHAPTER + '.active');
            expand(activeChapter);

            // expand current selected chapter's children
            // expand(activeChapter.parents(CHAPTER));
            activeChapter.find(ARTICLE_CHILDREN).closest(FOLDABLE).each(function () {
                expand($(this));
            });
        }
    }

    var toggle = function ($chapter) {
        if ($chapter.hasClass('expanded')) {
            collapse($chapter);
        } else {
            expand($chapter);
        }
    }

    var scrollToChapterAnchor = function ($chapter) {
        // Only the chapter's OWN link (its direct <a> child), not links belonging
        // to nested <ul> sub-chapters.
        var $link = $chapter.children('a').first();
        if (!$link.length) {
            return;
        }

        var href = $link.attr('href');
        if (!href || href.charAt(0) !== '#') {
            return;
        }

        var targetId = href.slice(1);
        var target = document.getElementById(targetId);
        if (!target) {
            return;
        }

        var $target = $(target);

        // Mark the target active the same way mobilePageScrollToAnchor (toc-date.html) does
        $link.closest('li.chapter').find('ul>li').removeClass('active');
        $link.parent().addClass('active');

        // Defer the scroll across two animation frames so the `expanded` class /
        // CSS transition has reflowed and offsetTop/geometry is accurate
        // post-expansion (measuring immediately after toggle() can be stale).
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                $target.get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    var collapse = function ($chapter) {
        if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.removeClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
        }
    }

    var expand = function ($chapter) {
        if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.addClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
        }
    }

    var lsItem = function () {
        var map = JSON.parse(localStorage.getItem(LS_NAMESPACE)) || {}
        if (arguments.length) {
            var $chapters = arguments[0];
            $chapters.each(function (index, element) {
                var level = $(this).data('level');
                var value = $(this).hasClass(TOGGLE_CLASSNAME);
                map[level] = value;
            })
            localStorage.setItem(LS_NAMESPACE, JSON.stringify(map));
        } else {
            return $(CHAPTER).map(function (index, element) {
                if (map[$(this).data('level')]) {
                    return this;
                }
            })
        }
    }

    gitbook.events.bind('page.change', function () {
        init()
    });
});
