---
layout: page
title: Gallery
permalink: /gallery/
nav: true
nav_order: 5
---

{% assign gallery_items = site.gallery | sort: 'date' | reverse %}

{% for item in gallery_items %}
  <h3>{{ item.title }}</h3>
  <p>{{ item.content }}</p>
{% endfor %}