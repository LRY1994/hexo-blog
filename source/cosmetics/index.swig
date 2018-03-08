

{% block title %}{{ config.title }}{% endblock %}


{% block content %}
<section id="home">
    <% for (var link in site.data.menu) { %>
  <a href="<%= site.data.menu[link] %>"> <%= link %> </a>
<% } %>
</section>
{% endblock %}
