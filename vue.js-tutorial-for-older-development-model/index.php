<?php

//应用入口文件
//echo '服务器升级，数据整理中，请稍后访问，夜深了早点休息。';
//exit;

//常用函数
//$_SERVER['HTTP_HOST']
//$_SERVER['REQUEST_URI']
//$_SERVER['SERVER_PORT']
//$_SERVER["HTTP_REFERER"]
//$_SERVER['HTTP_COOKIE']
//$_SERVER["REMOTE_ADDR"]
//$_SERVER["HTTP_X_FORWARDED_FOR"]
if($_SERVER['REMOTE_ADDR'] == '47.97.9.152'){
  	echo '您调用方式有误，请及时联系管理员！';
  	exit;
}
//file_put_contents('../logs/cq/log.txt',$_SERVER['HTTP_HOST'].'（'.$_SERVER['REQUEST_URI'].'）'.$_SERVER['REMOTE_ADDR'].PHP_EOL,FILE_APPEND);
// define('APP_DEBUG',True);
//测试模式
if(array_key_exists("HTTP_USER_AGENT",$_SERVER)){
  	if($_SERVER['HTTP_USER_AGENT'] == "fqapps_test"){
		define('APP_DEBUG',true);
	}
}
if(isset($_GET['cs']) && $_GET['cs'] == 1){
	define('APP_DEBUG',true);
}

if($_SERVER['HTTP_HOST']=='v2.api.haodanku.com'){
  	if(strpos($_SERVER['REQUEST_URI'],'get_keyword_items&apikey=eeetui')){
    	file_put_contents('./eeetui.txt',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].':'.$_SERVER["HTTP_X_FORWARDED_FOR"].PHP_EOL,FILE_APPEND);
      	//echo '接口调用过快，请联系管理员！';
      	//exit;
	}
  	//file_put_contents('./v2.api.txt',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'（'.$_POST['apikey'].'/'.$_POST['itemid'].'）'.PHP_EOL,FILE_APPEND);
}

if($_SERVER['HTTP_HOST']=='hdk6688.haodanku.com'){
  //file_put_contents('./hdk6688.txt',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'（'.$_SERVER['REMOTE_ADDR'].'-'.date('Y-m-d H:i:s',time()).'）'.PHP_EOL,FILE_APPEND);
  //echo '系统优化中';
  //exit;
}
if($_SERVER['HTTP_HOST']=='v2.api.haodanku.com'){
  //file_put_contents('./v2.api.txt',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'（'.$_SERVER['REMOTE_ADDR'].'时间：'.date('Y-m-d H:i:s',time()).'）'.PHP_EOL,FILE_APPEND);
  //echo '系统优化中';
  //exit;
}

if(strpos($_SERVER['REQUEST_URI'],'&from=niubei')){
    echo '该接口已取消服务 请联系服务商更新接口';
	exit;
}

if(strpos($_SERVER['REQUEST_URI'],'/get_keyword_items/apikey/zhejianmeimacxp') || strpos($_SERVER['REQUEST_URI'],'/get_keyword_items/apikey/zhejianmeimacxp')){
  	file_put_contents('./zhejianmeimacxp.txt',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'（'.$_POST['apikey'].'/'.$_POST['itemid'].'）'.PHP_EOL,FILE_APPEND);
    echo '您调用方式有误，请及时联系管理员！';
  	exit;
}

if(strpos($_SERVER['REQUEST_URI'],'json=true') || strpos($_SERVER['REQUEST_URI'],'json=1')){
   if(!strpos($_SERVER['REQUEST_URI'],'&from=hl') && $_SERVER['HTTP_HOST'] != 'publish.haodanku.com'){
    echo '该接口已取消服务 新API：http://www.haodanku.com/api/detail.html';
	exit;
  }
}


//定义应用目录
define('APP_PATH','./Application/');

//引入ThinkPHP入口文件
require './Framework/load.php';
