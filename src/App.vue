<template>
  <div class="bg" :style="bgCss">
    <section id="wrap">
      <h1>#Thumbnail Maker</h1>
      <h2>썸네일 메이커 v 1.0.0 - 벨로그 포멧</h2>

      <div id="profile">
        <img id="profile_img" :src="profile_img" alt="">
        <b>전상욱</b>
      </div> 
      <div id="img" ref="img" :style="bgCss">
        <div class="mainTitle">{{ mainTitle }}</div>
        <div v-if="!con" class="subTitle">{{ subTitle }}</div>
      </div>
      <article class="option">
        <div class="title">
          <div>
            <h3>제목을 입력해주세요</h3>
            <input class="input" @focus="mainFocus" @blur="mainBlur" v-model="mainTitle" />
          </div>
          <div v-if="!con">
            <h3>부제목을 입력해주세요</h3>
            <input class="input" @focus="subFocus" @blur="subBlur" v-model="subTitle" />
          </div>
        </div>
        <div class="background">
          <div>
            <h3>배경을 정해주세요</h3>
            <div>
              <input name="bg" ref="defaultRef1" type="radio" @click="graClick" id="bg1" checked>
              <label for="bg1">랜덤 그라이디언트</label>
              <input name="bg" type="radio" @click="justClick" id="bg2">
              <label for="bg2">랜덤 단색</label>
              <input name="bg" type="radio" id="bg3" :checked="imgURL_YN" @click="imgURLClick">
              <label for="bg3">이미지 URL</label>
            </div>
          </div>
          <input v-if="imgURL_YN" class="imgURL" @blur="imgURLBlur" placeholder="이미지 URL을 입력해주세요."/>
        </div>
        <div class="innerContent">
          <div>
            <h3>썸네일 구성 요소</h3>
            <div>
              <input name="c" ref="defaultRef2" type="radio" @click="conClick" id="c1" checked>
              <label for="c1">제목 / 부제목</label>
              <input name="c" type="radio" @click="conClick" id="c2">
              <label for="c2">제목</label>
            </div>
          </div>
        </div>
      </article>
      <div class="btn">
        <button @click="reset">초기화</button>
        <button @click="imgDownload">완료 및 다운로드</button>
      </div>
    </section>
  </div>
</template>

<script>
import html2canvas from './lib/html2canvas.js';
import profileImage from './img/a.png';
console.log(profileImage);
export default {
  data() {
    return {
      graColor: [
        'linear-gradient(67deg, rgb(162, 55, 232), rgb(23, 185, 184))',
        'linear-gradient(67deg, rgb(232, 144, 55), rgb(209, 67, 197))',
        'linear-gradient(67deg, rgb(30, 93, 172), rgb(77, 217, 130))',
        'linear-gradient(67deg, rgb(172, 30, 61), rgb(217, 203, 77))',
        'linear-gradient(67deg, rgb(255, 191, 181), rgb(200, 200, 150))',
      ],
      justColor: ['#E84B37', '#2088BD', '#CA7915', '#CA15BB', '#A237E8'],
      bgCss: {
        background: 'linear-gradient(67deg, rgb(162, 55, 232), rgb(23, 185, 184))'
      },
      profile_img: profileImage,
      mainTitle: '제목을 입력해주세요.',
      subTitle: '부제목을 입력해주세요.',
      imgURL_YN: false,
      con: 0
    }
  },
  methods: {
    imgURLBlur(e) {
      let val = e.target.value;
      if (val === '') return;
      this.bgCss = {
        background: 'url(' + val + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    },
    imgURLClick(e) {
      this.imgURL_YN = true;
    },
    mainFocus(e) {
      let val = e.target.value;
      if (val === '제목을 입력해주세요.') {
        e.target.value = '';
      }
    },
    subFocus(e) {
      let val = e.target.value;
      if (val === '부제목을 입력해주세요.') {
        e.target.value = '';
      }
    }, 
    mainBlur(e) {
      let val = e.target.value;
      if (val === '') {
        this.mainTitle = '제목을 입력해주세요.';
        e.target.value = '제목을 입력해주세요.';
      }
    },
    subBlur(e) {
      let val = e.target.value;
      if (val === '') {
        this.subTitle = '부제목을 입력해주세요.';
        e.target.value = '부제목을 입력해주세요.';
      }
    },
    graClick() {
      let num = parseInt(Math.random() * 10 / 2);
      this.bgCss = {
        background: this.graColor[num]
      }
      this.imgURL_YN = false;
    },
    justClick() {
      let num = parseInt(Math.random() * 10 / 2);
      this.bgCss = {
        background: this.justColor[num]
      }
      this.imgURL_YN = false;
    },
    conClick(e) {
      let id = e.target.id == 'c1' ? 0 : 1;
      this.con = id;
    },
    imgDownload() {
      let imgEl = this.$refs.img;
      html2canvas(imgEl).then(
        canvas => {
          let img = canvas.toDataURL();
          this.download(img, 'thumb.png');
        }
      )
    },
    download(uri, name) {
      var a = document.createElement('a');
      a.download = name;
      a.href = uri;
      a.click();
      a.remove();
    },
    reset() {
      this.$refs.defaultRef1.click();
      this.$refs.defaultRef2.click();
      this.mainTitle = '제목을 입력해주세요.';
      this.subTitle = '부제목을 입력해주세요.';
      this.bgCss = {
        background: 'linear-gradient(67deg, rgb(162, 55, 232), rgb(23, 185, 184))'
      },
      this.imgURL_YN = false;
      this.con = 0;
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  width: 100%;
  background-color: #aaa;
  border-radius: 10px;
}
* {
  margin: 0;
  padding: 0;
  color: inherit;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#wrap {
  width: 900px;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
  overflow: auto;
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #333;
  top: 0;
  left: 0;
  z-index: 2;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
h1 {
  font-size: 36px;
}
h2 {
  font-size: 12px;
  font-weight: 400;
  color: #999;
  margin-bottom: 50px;
}
#profile {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  letter-spacing: 1px;
}
#profile_img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
}
#img {
  background-color: #bbb;
  width: 800px;
  height: 418px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-flow: column;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.mainTitle {
  font-size: 50px;
  font-weight: 700;
  color: #fff;
  padding-bottom: 4px;
  margin-bottom: 10px;
  border-bottom: 1px solid #fff;
}
.subTitle {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}
.option {
  margin-bottom: 50px;
}
.option > div {
  padding: 14px 0;
  border-bottom: 1px solid #ddd;
}
.option > div > div {
  display: flex;
  align-items: center;
}
.option > .title > div:first-of-type {
  margin-bottom: 5px;
}
.option h3 {
  font-size: 16px;
  font-weight: 400;
  color: #555;
  width: 150px;
}
.input {
  width: 650px;
  border: none;
  background-color: #eee;
  height: 30px;
  border-radius: 100px;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  letter-spacing: 1px;
  transition: .2s;
}
.imgURL {
  width: 650px;
  border: none;
  background-color: #eee;
  height: 30px;
  border-radius: 100px;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  letter-spacing: 1px;
  transition: .2s;
  margin-top: 5px;
  margin-left: 150px;
}
.imgURL:focus {
  border: 1px solid #aaa;
}
.input:focus {
  border: 1px solid #aaa;
}
input[type="radio"] {
  display: none;
}
input:checked + label {
  background-color: #2563e0;
  color: #fff;
}
label {
  width: 206.64px;
  text-align: center;
  background-color: #eee;
  padding: 9px 0;
  border-radius: 100px;
  font-size: 14px;
  color: #777;
  cursor: pointer;
}
.background > div > div,
.innerContent > div > div {
  width: 650px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.innerContent > div > div {
  width: 429px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn > button {
  width: 120px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: transparent;
  margin: 0 3px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}
.btn > button:last-of-type {
  color: #fff;
  background-color: #2563e0;
}
</style>