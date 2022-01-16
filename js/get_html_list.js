async function URL_name_get(fetch_URL){
    if(fetch_URL.slice(-4)=="html"){
        var res = await fetch(fetch_URL)
        var res_text = await res.text();//<meta property="og:title" content="ページタイトル"/>って感じに描いてあるはず
        title_start=res_text.indexOf('<meta property="og:title" content="')+34;//<の位置+34が得られる
        title_end=res_text.indexOf('"',title_start+1);
        return res_text.substr(title_start+1,title_end-title_start-1);
    }else{  
        return fetch_URL.slice(-fetch_URL.length+fetch_URL.lastIndexOf("/")+1);
    }
}
async function ALL_page_show(){
    var res = await fetch("https://api.github.com/repos/junjiruw/DEYUTI/contents/omocha")//おもちゃ階層のページをgithubから持ってくる
    var res_json = await res.json();
    var omocha_ul = document.getElementById('omocha_ul');

    for(let i=0;i<res_json.length;i++){
        var new_li = document.createElement("li");
        
        var new_a = document.createElement('a');
        
        new_a.href="https://junjiruw.github.io/DEYUTI/" + res_json[i].path;
        new_a.textContent= await URL_name_get(new_a.href);

        new_a.className="";
        new_li.appendChild(new_a);

        omocha_ul.append(new_li);
    }
}