-- [1] DB 생성, DB생성은 mysql workbench
-- drop database if exists doctoro;
-- create database doctoro;
-- use doctoro;

-- [2] 테이블이 존재하면 삭제
drop table if exists rankpokemon;
drop table if exists reply;
drop table if exists comment;
drop table if exists board;
drop table if exists category;
drop table if exists users;

-- [3] 테이블 생성
-- 1. 회원 테이블
create table users(
    uno int auto_increment,
    id varchar(30) not null unique,
    password varchar(30) not null,
    name varchar(10) not null,
    gender varchar(2) not null,
    phone varchar(15) not null unique,
    distinction varchar(10) not null,
    primary key (uno)
);

-- 2. 카테고리 테이블
create table category(
    categoryno int auto_increment,
    categoryname varchar(10) not null unique,
    primary key (categoryno)
);

-- 3. 게시판 테이블
create table board(
    bno int auto_increment,
    btitle varchar(100) not null,
    bcontent varchar(300) not null,
    bdate datetime default now(),
    uno int not null,
    categoryno int not null,
    primary key(bno),
    foreign key(uno) references users (uno) on update cascade on delete cascade,
    foreign key(categoryno) references category (categoryno) on update cascade on delete cascade
);

-- 4. 댓글 테이블
create table comment(
    cno int auto_increment,
    ccontent varchar(150) not null,
    cdate datetime default now(),
    bno int not null,
    uno int not null,
    primary key(cno),
    foreign key(bno) references board (bno) on update cascade on delete cascade,
    foreign key(uno) references users (uno) on update cascade on delete cascade
);

-- 5. 대댓글 테이블
create table reply(
    rno int auto_increment,
    rcontent varchar(150) not null,
    rdate datetime default now(),
    cno int not null,
    uno int not null,
    primary key(rno),
    foreign key(cno) references comment (cno) on update cascade on delete cascade,
    foreign key(uno) references users (uno) on update cascade on delete cascade
);

-- 6. 포켓몬 랭킹(인기) 테이블
create table rankpokemon(
    pno int,
    click int default 0,
    win int default 0,
    primary key(pno)
);
