from aiohttp import web
import aiohttp_jinja2
import jinja2
import os
from pyrogram import Client

# Replace with your bot credentials
API_ID=17426055
API_HASH='7ed73b9d1b9e0d58dcf734d37290f57c'
BOT_TOKEN='7629221679:AAHZOChLISZ3LfKABfaEY-v216GtlyR2dv0'

bot = Client("web_bot", api_id=API_ID, api_hash=API_HASH, bot_token=BOT_TOKEN)

routes = web.RouteTableDef()

@routes.get("/")
@aiohttp_jinja2.template("app.html")
async def index(request):
    # Example: replace with real group_id or from session
    group_id = -1001234567890
    async with bot:
        chat = await bot.get_chat(group_id)
        members = []
        async for member in bot.iter_chat_members(group_id):
            members.append({
                "id": member.user.id,
                "name": member.user.first_name,
                "status": member.status,
                "is_bot": member.user.is_bot
            })
        admins = await bot.get_chat_administrators(group_id)
        group_settings = {
            "title": chat.title,
            "slow_mode": chat.slow_mode_delay,
            "permissions": chat.permissions.__dict__,  # mute/unmute etc.
            "members": members,
            "admins": [admin.user.id for admin in admins],
        }

    return {"group": group_settings}

@routes.post("/action/{group_id}/{user_id}/{action}")
async def action(request):
    group_id = int(request.match_info['group_id'])
    user_id = int(request.match_info['user_id'])
    action = request.match_info['action']
    async with bot:
        if action == "mute":
            await bot.restrict_chat_member(group_id, user_id, permissions={})
        elif action == "unmute":
            await bot.restrict_chat_member(group_id, user_id, permissions={"can_send_messages": True})
        elif action == "ban":
            await bot.ban_chat_member(group_id, user_id)
        elif action == "promote":
            await bot.promote_chat_member(group_id, user_id, can_manage_chat=True, can_delete_messages=True, can_promote_members=True)
        elif action == "demote":
            await bot.promote_chat_member(group_id, user_id, can_manage_chat=False, can_delete_messages=False, can_promote_members=False)

    raise web.HTTPFound("/")

app = web.Application()
aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader("App"))
app.add_routes([web.static("/CSS", os.path.join("App", "CSS")),
                web.static("/JS", os.path.join("App", "JS"))])
app.add_routes(routes)

if __name__ == "__main__":
    # bot.start()
    web.run_app(app, port=8443)
    bot.stop()
