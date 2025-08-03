#__main__.py

from d4rk.Logs import setup_logger

from src.Telegram import bot
from src.Config import APP_NAME

logger = setup_logger(APP_NAME)

def main():
    logger.info(f"Starting {APP_NAME}...")
    bot.run()

if __name__ == '__main__':
    main()

