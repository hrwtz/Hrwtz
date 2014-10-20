<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}
?>

	<script>var pagebase = '<?php echo $page_base; ?>';</script>
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="<?php echo $page_base; ?>_/js/pro/global.min.js"></script>
</body>
</html>