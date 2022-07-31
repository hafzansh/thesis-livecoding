<script lang="ts">
import { goto } from "$app/navigation";
import { session } from "$app/stores";

import { send } from "../../lib/api";
    let error=false
    let error_val:string
    if ($session.user.authenticated){
        goto('/')
    }
    const submitForm = async (event:SubmitEvent) => {
        const el = event.target as HTMLFormElement
        const response = await send(el)
        if (response.error){
            error = true
                        
            return error_val = response.error
        }
        window.location.href = "/"
    }
    
</script>
<div class="flex flex-col min-h-screen bg-base-200 justify-center items-center">
    <div class=" bg-base-300 w-[30vw] rounded-3xl text-black p-10">
        <form method="post" on:submit|preventDefault={submitForm}>
            
            <div class="w-full flex flex-col gap-5 items-start justify-center">
                <h1 class="text-5xl font-bold items-center">Login</h1>                
                <input type="text" class="input input-bordered w-full" placeholder="username" name="username">
                <input type="text" class="input input-bordered w-full" placeholder="password" name="password">
                {#if error}
                <input type="text" class="input input-bordered input-primary w-full" value={error_val} disabled>
                {/if}
                <button type="submit" class="btn btn-success w-full">Login</button>
            </div>
        </form>
    </div>
</div>