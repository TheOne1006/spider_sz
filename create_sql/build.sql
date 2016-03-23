CREATE DATABASE  `sina_blog` DEFAULT CHARSET=utf8;


 CREATE TABLE IF NOT EXISTS `class_list` (
   `id` INT(11) NOT NULL COMMENT '文章分类id,主键' ,
   `url` TEXT NOT NULL COMMENT '文章分类页面url' ,
   `name` VARCHAR(80) NOT NULL COMMENT '文章分类名称' ,
   `count` INT(11) NOT NULL COMMENT '文章数量' ,
   PRIMARY KEY (`id`)
 ) ENGINE = MyISAM DEFAULT CHARSET=utf8 COMMENT='文章分类';



 CREATE TABLE IF NOT EXISTS `article_list` (
   `id` varchar(20) NOT NULL COMMENT '文章id 与 class_id 为联合主键',
   `title` varchar(255) NOT NULL COMMENT '文章标题',
   `url` text NOT NULL COMMENT '文章url',
   `class_id` int(11) NOT NULL COMMENT '文章所属分类id',
   `created_time` int(11) NOT NULL COMMENT '发布时间',
   PRIMARY KEY (`id`,`class_id`),
   KEY `created_time` (`created_time`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;



 CREATE TABLE IF NOT EXISTS `article_tag` (
   `id` varchar(20) NOT NULL COMMENT '文章id, 与 tag 标签名称 为联合主键',
   `tag` varchar(20) NOT NULL COMMENT '标签名称',
   PRIMARY KEY (`id`,`tag`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;



 CREATE TABLE IF NOT EXISTS `article_detail` (
  `id` varchar(20) NOT NULL COMMENT '文章id',
  `tags` text NOT NULL COMMENT '文章标签',
  `content` longtext NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
