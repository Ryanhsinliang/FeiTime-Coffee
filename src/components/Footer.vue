<template>
  <footer class="bg-[#FAF9EE]/70 backdrop-blur-md pt-20 pb-10 border-t border-[#DCCFC0]/30">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
        <!-- Logo & Info -->
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2 text-[#A2AF9B]">
            <div
              class="size-6 rounded-full border border-[#DCCFC0]/40 flex items-center justify-center bg-[#A2AF9B] text-[#B5A893] relative shadow-sm overflow-hidden"
            >
              <span class="material-symbols-outlined text-sm font-light z-10">coffee</span>
            </div>
            <h2 class="text-lg font-serif font-medium tracking-widest text-[#A2AF9B]">FeiTime</h2>
          </div>
          <p class="text-[#B5A893] text-xs leading-loose font-light">
            Simple, honest coffee. Sourced with care, roasted with passion, and brewed for moments
            of peace.
          </p>
          <div class="flex gap-6 mt-2 text-[#A2AF9B]">
            <a href="#"><span class="material-symbols-outlined text-xl">public</span></a>
            <a href="#"><span class="material-symbols-outlined text-xl">photo_camera</span></a>
            <a href="#"><span class="material-symbols-outlined text-xl">alternate_email</span></a>
          </div>
        </div>

        <!-- Shop Links -->
        <div>
          <h3 class="font-medium text-[#A2AF9B] mb-6 uppercase tracking-[0.1em] text-xs font-jp">
            Shop
          </h3>
          <ul class="flex flex-col gap-3 text-xs text-[#B5A893] font-light tracking-wide">
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">All Coffee</a></li>
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">Equipment</a></li>
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">Subscription</a></li>
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">Gift Cards</a></li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-medium text-[#A2AF9B] mb-6 uppercase tracking-[0.1em] text-xs font-jp">
            Support
          </h3>
          <ul class="flex flex-col gap-3 text-xs text-[#B5A893] font-light tracking-wide">
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">FAQ</a></li>
            <li>
              <a class="hover:text-[#A2AF9B] transition-colors" href="#">Shipping & Returns</a>
            </li>
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">Contact Us</a></li>
            <li><a class="hover:text-[#A2AF9B] transition-colors" href="#">Wholesale</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-medium text-[#A2AF9B] mb-6 uppercase tracking-[0.1em] text-xs font-jp">
            Contact
          </h3>
          <ul class="flex flex-col gap-4 text-xs text-[#B5A893] font-light tracking-wide">
            <li class="flex items-start gap-3">
              <span class="material-symbols-outlined text-[#A2AF9B] text-base mt-0.5">
                location_on
              </span>
              <span>123 Brew Street, Coffee City, CC 90210</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#A2AF9B] text-base">mail</span>
              <span>hello@feitime.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="pt-8 border-t border-[#DCCFC0]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#B5A893] uppercase tracking-wider"
      >
        <p>© 2025 FeiTime Coffee. All rights reserved.</p>
        <div class="flex gap-8">
          <a class="hover:text-[#A2AF9B] transition-colors" href="#">Privacy Policy</a>
          <a class="hover:text-[#A2AF9B] transition-colors" href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
