//倒计时
var maxtime = 1200; //倒计时秒数
setInterval(function() {
	maxtime--;
	var miao = maxtime % 60; //秒数
	var fen = Math.floor(maxtime/60);
	$("#fen").text(fen);
	$("#miao").text(miao);
}, 1000);
//计算商品总数量以及总价格
function Zomoney () {
	var num = 0;
	var money = 0;
	$(".num").each(function () {
		num += parseInt($(this).val());
		money += parseInt($(this).parent().next().text().slice(1));
	})
	$("#zo-num").text(num);
	$("#zo-money").text("￥"+money);
}
//商品增加事件
function Add (add) {
	var num = parseInt($(add).prev().val())+1; //获取增加后商品数量
	$(add).prev().val(num); //赋值
	var money = parseInt($(add).parent().prev().text().slice(1)); //获取商品价格
	$(add).parent().next().text("￥"+money*num); //该商品小计赋值
	Zomoney();
}
//商品减少事件
function Subtract (subtract) {
	var num = parseInt($(subtract).next().val()); //获取商品数量
	if(num==1){
		var remove = confirm("这个商品只有最后一件了，再减就没得了，确定继续吗？");
		if(remove){$(subtract).parent().parent().remove();}	 //删除商品
	}
	else{
		num-=1;
		$(subtract).next().val(num); //赋值
		var money = parseInt($(subtract).parent().prev().text().slice(1)); //获取商品价格
		$(subtract).parent().next().text("￥"+money*num); //该商品小计赋值
	}
	Zomoney();
}
//删除商品
function Remove (remove) {
	$(remove).parent().parent().parent().remove(); //删除该行
	Zomoney();
	if($("tr").length==1){$("#quan").prop("checked",false);} //全选按钮不选中
}
//购买商品
$(".gomai").click(function () {
	var src = $(this).parent().siblings("img")[0].src; //图片地址
	var name = $(this).parent().siblings(".name").text(); //商品名称
	var money = $(this).parent().siblings(".money").text(); //商品价格
	var bool=false; //是否存在已购买的手机,默认不存在
	$(".go-name").each(function () {
		if($(this).text()==name){bool=true;return;}
	})                                                              //触发该行的add类名节点的单击事件
	if(bool==true){$(".go-name:contains("+name+")").parent().parent().find('.add').trigger('click');}
	else{
		var num = $(".go-name:contains("+name+")").parent().next().next().children(".num"); //该商品已购买的数量
		var zomoney = parseInt($(".go-name:contains("+name+")").parent().next().text().slice(1)); //该商品的单价
		num.val(parseInt(num.val())+1);
		$(".go-name:contains("+name+")").parent().next().next().next().text("￥"+num.val()*zomoney);
		var tr=$("<tr class='tr'>"+
		"<td><input type='checkbox' class='xuan1' onclick='quan()'/></td>"+
		"<td><img src="+src+"/><span class='go-name'>"+name+"</span></td>"+
		"<td class='go-money'>"+money+"</td> <td><input type='button' value='-' class='move' onclick='Subtract(this)' /><input type='text' class='num' value='1' /><input type='button' value='+' class='add' onclick='Add(this)' /></td>"+
		"<td class='xiaoj-money'>"+money+"</td>"+
		"<td><div class='shan'><a style='cursor: pointer;' class='shanchu' onclick='Remove(this)'>删除</a></div></td>"+
		"</tr>");
		$("#table").append(tr);	
		$("#quan").prop("checked",false);//全选按钮不选中
	}
	Zomoney();
})
//全选
$("#quan").change(function () {
	if ($(this).is(":checked")) {$(".xuan1").prop("checked",true);}
	else{$(".xuan1").prop("checked",false);}
})
function quan () {
	var num = 0; //一共有几个商品选择框被选中
	$(".xuan1").each(function () {
		if($(this).is(":checked")){num+=1;}
	})
	if(num==$(".xuan1").length){$("#quan").prop("checked",true);}
	else{$("#quan").prop("checked",false);}
}