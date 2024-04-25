
var config = {};

config.file_upload_handler = function (file, callback, optionalIndex, optionalFiles) {
    var uploadhandlerpath = "https://api.imgbb.com/1/upload";  // Updated upload server URL

    console.log("upload", file, "to", uploadhandlerpath);

    function append(parent, tagname, csstext) {
        var tag = parent.ownerDocument.createElement(tagname);
        if (csstext) tag.style.cssText = csstext;
        parent.appendChild(tag);
        return tag;
    }

    var uploadcancelled = false;

    var dialogouter = append(document.body, "div", "display:flex;align-items:center;justify-content:center;z-index:999999;position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:rgba(128,128,128,0.5)");
    var dialoginner = append(dialogouter, "div", "background-color:white;border:solid 1px gray;border-radius:15px;padding:15px;min-width:200px;box-shadow:2px 2px 6px #7777");

    var line1 = append(dialoginner, "div", "text-align:center;font-size:1.2em;margin:0.5em;");
    line1.innerText = "Uploading...";

    var totalsize = file.size;
    var sentsize = 0;

    if (optionalFiles && optionalFiles.length > 1) {
        totalsize = 0;
        for (var i = 0; i < optionalFiles.length; i++) {
            totalsize += optionalFiles[i].size;
            if (i < optionalIndex) sentsize = totalsize;
        }
        console.log(totalsize, optionalIndex, optionalFiles)
        line1.innerText = "Uploading..." + (optionalIndex + 1) + "/" + optionalFiles.length;
    }

    var line2 = append(dialoginner, "div", "text-align:center;font-size:1.0em;margin:0.5em;");
    line2.innerText = "0%";

    var progressbar = append(dialoginner, "div", "border:solid 1px gray;margin:0.5em;");
    var progressbg = append(progressbar, "div", "height:12px");

    var line3 = append(dialoginner, "div", "text-align:center;font-size:1.0em;margin:0.5em;");
    var btn = append(line3, "button");
    btn.className = "btn btn-primary";
    btn.innerText = "cancel";
    btn.onclick = function () {
        uploadcancelled = true;
        xh.abort();
    }

    var xh = new XMLHttpRequest();
    xh.open("POST", uploadhandlerpath, true);

    var formData = new FormData();
    formData.append("image", file);

    formData.append("key", "f2904eb8fc985c607416c5841c1d9007");
    formData.append("expiration", "2592000");

    xh.onload = xh.onabort = xh.onerror = function (pe) {
        console.log(pe);
        console.log(xh);

        // Handle the response
        dialogouter.parentNode.removeChild(dialogouter);

        if (pe.type === "load") {
            if (xh.status === 200) {
                var response = JSON.parse(xh.responseText);

                if (response.data.url) {
                    console.log("File uploaded to " + response.data.url);
                    callback(response.data.url);
                } else {
                    console.log("Server error:", response.error.message);
                    callback(null, "server-error-" + response.error.message);
                }
            } else {
                console.log("HTTP error:", xh.status);
                callback(null, "http-error-" + xh.status);
            }
        } else if (uploadcancelled) {
            console.log("uploadcancelled", pe);
            callback(null, "cancelled");
        } else {
            console.log("uploaderror", pe);
            callback(null, pe.type);
        }
    };
    xh.upload.onprogress = function (pe) {
        console.log(pe);
        var percent = Math.floor(100 * (sentsize + pe.loaded) / totalsize);
        line2.innerText = percent + "%";

        progressbg.style.cssText = "background-color:green;width:" + (percent * progressbar.offsetWidth / 100) + "px;height:12px;";
    }
    xh.send(formData);
};

config.editorResizeMode = "height";
config.skin = "blue";
var message = new RichTextEditor("#message", config);




message.document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == 'm') {
        e.preventDefault();
        message.insertHTML("&nbsp;" + "<b>Copyright (c) AdealTube. All right reversed.</b>" + "&nbsp;");
        message.collapse(false);
    }

    if (e.altKey && e.shiftKey && e.keyCode >= 48 && e.keyCode <=57) {
        e.preventDefault();
        message.insertHTML("&nbsp;" + `<sup>${e.keyCode >= 49 && e.keyCode <= 57 ? String.fromCharCode(e.keyCode) : 0}</sup>` + "&nbsp;");
        message.collapse(false);
    }
    if (e.ctrlKey && e.altKey && e.keyCode >= 48 && e.keyCode <=57) {
        e.preventDefault();
        message.insertHTML("&nbsp;" + `<sub>${e.keyCode >= 49 && e.keyCode <= 57 ? String.fromCharCode(e.keyCode) : 0}</sub>` + "&nbsp;");
        message.collapse(false);
    }
})

$('.richtexteditor').addClass('rte-skin-rounded-corner')
