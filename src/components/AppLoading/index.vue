<template>
  <div id="loading-mask">
    <div class="inner-wrapper">
      <div class="system-icon">
        <svg-icon icon="Vue" class="icon"></svg-icon>
      </div>
      <div class="loading-wrapper">
        <span class="loading-dot loading-dot-spin">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <div class="system-name">V3elm Admin</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #f4f4f4;
  user-select: none;
  z-index: 9999;
  overflow: hidden;
}
.inner-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.system-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .icon {
    width: 100px;
    height: 100px;
  }
}
.system-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 24px;
}
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}
.loading-dot {
  animation: antRotate 1.2s infinite linear;
  transform: rotate(45deg);
  position: relative;
  display: inline-block;
  font-size: 64px;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
}
.loading-dot i {
  width: 22px;
  height: 22px;
  position: absolute;
  display: block;
  background-color: #1890ff;
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: antSpinMove 1s infinite linear alternate;
}
@for $i from 1 through 4 {
  .loading-dot i:nth-child(#{$i}) {
    @if $i < 3 {
      top: 0;
    }
    @if $i == 1 or $i == 4 {
      left: 0;
    }
    @if $i == 2 or $i == 3 {
      right: 0;
    }
    @if $i > 2 {
      bottom: 0;
    }
    animation-delay: calc(0.4s * ($i - 1));
  }
}

@keyframes antRotate {
  to {
    -webkit-transform: rotate(405deg);
    transform: rotate(405deg);
  }
}
@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}
</style>
