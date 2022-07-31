<script lang="ts">
import { goto } from "$app/navigation";
import { session } from "$app/stores";
  if (!$session.user.authenticated){
      goto('/login')
  }
  
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Home</h1>
        <p class="py-6">Username  : {$session.user.username}</p>
        <p class="pb-6">Full Name : {$session.user.full_name}</p>
        <a href="/logout">
            <button class="btn btn-primary" >Log Out</button>
        </a>
      </div>
    </div>
  </div>