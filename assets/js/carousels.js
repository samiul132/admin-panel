new Swiper('.mySwiper1', {
    loop: true,
    pagination: {
      el: '.mySwiper1 .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.mySwiper1 .swiper-button-next',
      prevEl: '.mySwiper1 .swiper-button-prev',
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // Carousel 2: Fade Effect
  new Swiper('.mySwiper2', {
    effect: 'fade',
    loop: true,
    pagination: {
      el: '.mySwiper2 .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // Carousel 3: Coverflow Effect
  new Swiper('.mySwiper3', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.mySwiper3 .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
  });

  // Carousel 4: Multiple per View
  new Swiper('.mySwiper4', {
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
    pagination: {
      el: '.mySwiper4 .swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  // Carousel 5: Vertical
  new Swiper('.mySwiper5', {
    direction: 'vertical',
    loop: true,
    pagination: {
      el: '.mySwiper5 .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
