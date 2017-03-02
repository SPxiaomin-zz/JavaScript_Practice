function addLoadEvent(newFunc) {
    let func = window.onload;

    if (typeof func !== 'function') {
        window.onload = newFunc;
    } else {
        window.onload = () => {
            func();
            newFunc();
        };
    }
}

function lazyLoad() {
    let images = document.getElementsByTagName('img'),
        len = images.length,
        n = 0;

    return () => {
        let seeHeight = document.documentElement.clientHeight,
            scrollTop = document.documentElement.scrollTop
                || document.body.scrollTop;
        let tmpImg;

        for (let i = n; i < len; i++) {
            tmpImg = images[i]

            if (tmpImg.offsetTop <= seeHeight + scrollTop) {

                // 确认图片是不是loading图片，如果是的话就进行替换
                if (tmpImg.getAttribute('src') === './public/images/loading.gif') {

                    tmpImg.src = tmpImg.dataset.src;
                }
                n++; // 已经加载过的图片，再次就不需要再进行遍历了
            }
        }
    };
}

let loadImages = lazyLoad();
addLoadEvent(loadImages);
