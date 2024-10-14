-- [1] DB 생성, DB생성은 mysql workbench
--drop database if exists doctoro;
--create database doctoro;
--use doctoro;

-- [2] 테이블이 존재하면 삭제
drop table if exists reply;
drop table if exists comment;
drop table if exists board;
drop table if exists category;
drop table if exists proposal;
drop table if exists explog;
drop table if exists mypokemon;
drop table if exists rankpokemon;
drop table if exists ratepokemon;
drop table if exists pointlog;
drop table if exists inventory;
drop table if exists odetails;
drop table if exists cart;
drop table if exists product;
drop table if exists pcategory;
drop table if exists delivery;
drop table if exists orders;
drop table if exists users;

-- [3] 테이블 생성
-- 1. 회원 테이블
create table users(
    uno int auto_increment,
    id varchar(30) not null unique,
    password varchar(30) not null,
    name varchar(15) not null,
    gender varchar(2) not null,
    phone varchar(15) not null unique,
    ubirth varchar(20) not null,
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
    bview int default 0,
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

-- 5. 포켓몬 랭킹(인기) 테이블
create table rankpokemon(
    pno int,
    click int default 0,
    win int default 0,
    primary key(pno)
);

-- 6. 포켓몬 승률 예측 기록 테이블
create table ratepokemon(
    rno int auto_increment,
    rscore float,
    rrate float,
    rresult int,
    rpokeindex int,
    rskillpower int,
    rhp int,
    ratk int,
    rdef int,
    rspd int,
    rspatk int,
    rspdef int,
    primary key(rno)
);

-- 7. 선호포켓몬 테이블
create table proposal(
	prono int,
    uno int,
    pno int,
    primary key(prono),
    foreign key(uno) references users (uno) on update cascade on delete cascade,
    foreign key(pno) references rankpokemon (pno) on update cascade on delete cascade
);

-- 8. 내 포켓몬 테이블
create table mypokemon(
    mpno int auto_increment,
    pokeno int not null,
    stage int not null,
    uno int not null,
    primary key (mpno),
    foreign key(uno) references users (uno) on update cascade on delete cascade
);

-- 9. 포켓몬 경험치 기록 테이블
create table explog(
    eno int auto_increment,
    expvalue int not null,
    expmethod varchar(30) not null,
    expdate datetime default now(),
    mpno int not null,
    primary key (eno),
    foreign key(mpno) references mypokemon (mpno) on update cascade on delete cascade
);

-- 10. 포인트 로그 테이블
create table pointlog(
    point_no int auto_increment,
    point_indecrease int not null,
    point_date datetime default now(),
    free_paid varchar(10) not null,
    point_reason varchar(30) not null,
    uno int not null,
    primary key (point_no),
    foreign key(uno) references users (uno) on update cascade on delete cascade
);

-- 11. 상품 카테고리 테이블
create table pcategory (
    pcategory_no int auto_increment,   			   -- 상품 카테고리 번호
    pcategory_name varchar(20) not null,           -- 카테고리명
    primary key (pcategory_no)
);

-- 12. 상품 테이블
create table product (
    product_no int auto_increment,   			   -- 상품 번호
    product_name varchar(50) not null,             -- 상품명
    price int not null,                            -- 가격
    product_image varchar(255) not null,           -- 이미지
    produc_description varchar(255) not null,      -- 상품 설명
	pcategory_no int not null,                     -- 상품 카테고리 번호 (외래키)
	primary key (product_no),
    foreign key(pcategory_no) references pcategory (pcategory_no) on update cascade on delete cascade
);

-- 13. 재고 테이블
create table inventory (
    inventory_no int auto_increment,   			   -- 재고 번호
    inventory_indecrease int not null,             -- 재고 증감
    inventory_date datetime default now(),         -- 날짜/시간
    inventory_reason varchar(50) not null,         -- 재고 증감 사유
    product_no int not null,                       -- 상품 번호 (외래키)
    primary key (inventory_no),
    foreign key(product_no) references product (product_no) on update cascade on delete cascade
);

-- 14. 주문 테이블
create table orders (
    order_no int auto_increment,   			   -- 주문 번호
    order_date datetime default now(),         -- 주문일
    uno int not null,                      -- 유저 번호 (외래키)
	primary key (order_no),
    foreign key(uno) references users (uno) on update cascade on delete cascade
);

-- 15. 주문 상세 테이블
create table odetails (
    odetail_no int auto_increment,   		-- 주문 상세 번호
    order_status int not null,              -- 주문 상태
    product_no int not null,                -- 상품 번호 (외래키)
    order_no int not null,                  -- 주문 번호 (외래키)
    primary key (odetail_no),
    foreign key(product_no) references product (product_no) on update cascade on delete cascade,
    foreign key(order_no) references orders (order_no) on update cascade on delete cascade
);

-- 16. 배송 테이블
create table delivery (
    delivery_no int auto_increment,   			   -- 배송 번호
    delivery_status varchar(20) not null,          -- 배송 상태
    delivery_date datetime,                        -- 배송 시작 날짜
    order_no int not null,                         -- 주문 번호 (외래키)
    primary key (delivery_no),
    foreign key(order_no) references orders (order_no) on update cascade on delete cascade
);

-- 17. 장바구니 테이블
create table cart (
    cart_no int auto_increment,				-- 장바구니 번호
    cart_product_quantity int not null,     -- 장바구니에 담긴 상품 수량
    product_no int not null,                -- 상품 번호 (외래키)
    uno int not null,                       -- 유저 번호 (외래키)
    primary key (cart_no),
    foreign key(product_no) references product (product_no) on update cascade on delete cascade,
    foreign key(uno) references users (uno) on update cascade on delete cascade
);


