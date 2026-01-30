---
layout: page
title: Gallery
permalink: /gallery/
description: A collection of memorable moments and experiences
nav: true
nav_order: 5
---

<div class="gallery">
  {% assign sorted_gallery = site.gallery | sort: 'importance' %}
  <div class="row row-cols-1 row-cols-md-3 g-3">
    {% for item in sorted_gallery %}
      {% include gallery.liquid %}
    {% endfor %}
  </div>
</div>
