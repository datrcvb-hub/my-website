/* ==================================================
   我的兴趣世界
   全站通用 JavaScript
   ================================================== */


/* ==================================================
   1. 页面进入动画
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-ready");

});


/* ==================================================
   2. 页面跳转动画
   ================================================== */

document.addEventListener("click", (event) => {

    const link = event.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href) return;

    /*
       以下链接不进行页面离开动画
    */

    if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http") ||
        href === "#" ||
        link.target === "_blank"
    ) {
        return;
    }

    /*
       HTML 页面跳转
    */

    if (href.endsWith(".html")) {

        event.preventDefault();

        document.body.classList.add(
            "page-leaving"
        );

        setTimeout(() => {

            window.location.href = href;

        }, 250);

    }

});


/* ==================================================
   3. 滚动出现动画
   ================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* ==================================================
   4. 卡片鼠标光效
   ================================================== */

const cards =
    document.querySelectorAll(
        ".card, .game, .movie, .project, .stat"
    );


cards.forEach((card) => {

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );


    card.addEventListener(
        "pointerleave",
        () => {

            card.style.removeProperty(
                "--mouse-x"
            );

            card.style.removeProperty(
                "--mouse-y"
            );

        }
    );

});


/* ==================================================
   5. 返回顶部按钮
   ================================================== */

const topButton =
    document.getElementById("top");


if (topButton) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ==================================================
   6. 数字统计动画
   ================================================== */

const counters =
    document.querySelectorAll(
        ".counter"
    );


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        /*
                           防止数字重复播放
                        */

                        if (
                            counter.dataset.done
                        ) {
                            return;
                        }


                        counter.dataset.done =
                            "true";


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        let current = 0;

                        const duration = 1200;

                        const startTime =
                            performance.now();


                        function update(now) {

                            const progress =
                                Math.min(
                                    (now - startTime) /
                                    duration,
                                    1
                                );


                            /*
                               缓动效果
                            */

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            current =
                                Math.floor(
                                    target *
                                    eased
                                );


                            counter.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    update
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            update
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );

        }
    );

}


/* ==================================================
   7. 按钮按压反馈
   ================================================== */

document.addEventListener(
    "pointerdown",
    (event) => {

        const button =
            event.target.closest(
                ".button, .btn, .home, button"
            );


        if (!button) return;


        button.classList.add(
            "pressed"
        );

    }
);


document.addEventListener(
    "pointerup",
    (event) => {

        const button =
            event.target.closest(
                ".button, .btn, .home, button"
            );


        if (!button) return;


        setTimeout(() => {

            button.classList.remove(
                "pressed"
            );

        }, 120);

    }
);


/* ==================================================
   8. 当前页面导航高亮
   ================================================== */

let currentPage =
    window.location.pathname
    .split("/")
    .pop();


/*
   如果浏览器地址没有文件名，
   默认认为是 index.html
*/

if (
    !currentPage ||
    currentPage === ""
) {

    currentPage =
        "index.html";

}


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach(
    (link) => {

        const href =
            link.getAttribute(
                "href"
            );


        if (
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    }
);


/* ==================================================
   9. 图片 / 音频错误保护
   ================================================== */

window.addEventListener(
    "error",
    (event) => {

        const target =
            event.target;


        if (!target) return;


        if (
            target.tagName === "IMG"
        ) {

            /*
               图片加载失败时，
               不让网页报错
            */

            target.classList.add(
                "image-error"
            );

        }


        if (
            target.tagName === "AUDIO"
        ) {

            console.log(
                "音乐文件加载失败：",
                target.src
            );

        }

    },
    true
);


/* ==================================================
   10. 图片懒加载增强
   ================================================== */

const lazyImages =
    document.querySelectorAll(
        "img[data-src]"
    );


if (
    lazyImages.length > 0
) {

    const imageObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const image =
                            entry.target;


                        image.src =
                            image.dataset.src;


                        image.removeAttribute(
                            "data-src"
                        );


                        imageObserver.unobserve(
                            image
                        );

                    }
                );

            },
            {
                rootMargin:
                    "100px"
            }
        );


    lazyImages.forEach(
        (image) => {

            imageObserver.observe(
                image
            );

        }
    );

}


/* ==================================================
   11. 防止双击页面缩放造成误触
   ================================================== */

let lastTouchTime = 0;


document.addEventListener(
    "touchend",
    (event) => {

        const now =
            Date.now();


        if (
            now - lastTouchTime <= 300
        ) {

            event.preventDefault();

        }


        lastTouchTime = now;

    },
    {
        passive: false
    }
);


/* ==================================================
   12. 页面加载完成
   ================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/* ==================================================
   13. 控制台信息
   ================================================== */

console.log(
    "🌌 我的兴趣世界已启动"
);

console.log(
    "🎮 游戏 · 📷 摄影 · 🎬 电影 · 🎵 音乐 · 💻 编程"
);


/* ==================================================
   14. 键盘 Home 键返回顶部
   ================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Home" &&
            !event.target.matches(
                "input, textarea"
            )
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }
);


/* ==================================================
   15. 页面离开保护
   ================================================== */

window.addEventListener(
    "beforeunload",
    () => {

        document.body.classList.add(
            "page-leaving"
        );

    }
);