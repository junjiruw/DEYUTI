function onload_functions(){
    is_this_sumaho();
    html_link_show();
    btn_looks_better();
}
function is_this_sumaho() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {//貴様！スマホで見ているな！？
        document.getElementById('mannaka').style.fontSize="3.5vw";
        document.getElementById('header').style.fontSize="3vw";
        document.getElementById('html_link_nav').style.fontSize="5vw";
    }
}
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
async function ALL_page_show(directory){//***_ulを探して表示するよ
    var res = await fetch("https://api.github.com/repos/junjiruw/DEYUTI/contents/"+directory)//おもちゃ階層のページをgithubから持ってくる
    var res_json = await res.json();
    var omocha_ul = document.getElementById(directory+"_ul");

    for(let i=0;i<res_json.length;i++){
        if(res_json[i].path.slice(-18)=="html_template.html"){
            //テンプレページ表示してもしょうがないので
        }else{
            var new_li = document.createElement("li");
            
            var new_a = document.createElement('a');
            
            new_a.href="https://junjiruw.github.io/DEYUTI/" + res_json[i].path;
            new_a.textContent= await URL_name_get(new_a.href);

            new_a.className="";
            new_li.appendChild(new_a);

            omocha_ul.append(new_li);
        }
    }
}
function html_link_show(){//え？この程度ならhtmlに最初から書けって？だって今後増えたときに全部書き換えることになるじゃん
    var html_link_ul = document.getElementById('html_link_ul');
    
    var new_li = document.createElement("li");
    var new_a = document.createElement('a');
    new_a.href="https://junjiruw.github.io/DEYUTI/index.html";
    new_a.textContent="トップページ";
    new_li.appendChild(new_a);
    new_a.className="added_a";
    html_link_ul.append(new_li);

    var new_li = document.createElement("li");
    var new_a = document.createElement('a');
    new_a.href="https://junjiruw.github.io/DEYUTI/omocha/omocha_top.html";
    new_a.textContent="おもちゃ";
    new_li.appendChild(new_a);
    new_a.className="added_a";
    html_link_ul.append(new_li);


}
function btn_looks_better(){//jsでボタンの見た目を改善しましょう。　いや、ヘッダーは全部改善する。メインはボタン。
    var header_height=document.getElementById("header").clientHeight;
    document.getElementById("html_link_btn").style.height=header_height+ 'px';//数字じゃなくて文字を入れる。cssをいじってるので。
    document.getElementById("html_link_btn").style.width=header_height+ 'px';
    document.getElementById('html_link_btn').style.fontSize=header_height*0.5+ 'px';
    document.getElementById('html_link_btn').innerText='☛';
    document.getElementById("html_link_nav").style.marginTop=header_height+ 'px';


    document.getElementById("title_h1").style.paddingLeft=header_height+10+ 'px';//ボタン置くスペース確保
    document.getElementById("go_home").style.height=header_height+ 'px';

    
}

function html_link_btn(){
	var list_nav = document.getElementById("html_link_nav");
    var list_btn = document.getElementById("html_link_btn");

	if(list_nav.style.display=="block"){
		// noneで非表示
		list_nav.style.display ="none";
        list_btn.style.transform= "rotate(" + 0 + "deg)";
	}else{
		// blockで表示
		list_nav.style.display ="block";
        list_btn.style.transform= "rotate(" + 90 + "deg)";
	}
}