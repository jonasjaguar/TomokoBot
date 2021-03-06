/**
 * This file is part of Tomoko, a Discord Bot for
 * moderation, fun, levels, music and much more!
 * Copyright (C) 2018-2021 Emily <elishikawa@jagudev.net>
 *
 * Tomoko is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Tomoko.  If not, see <https://www.gnu.org/licenses/>.
**/

module.exports.run = (message, args) => { // Command to get weather in a city
    if (args.length !== 0) {
        if (args[0].startsWith("locid:")) {
            var locationID = parseInt(args[0].split("uid:")[1]);
            if (isNaN(locationID)) {
                invalidArgs(message, message.author, message.content.split(" ")[0]);
                return;
            }

            weather.setCityId(locationID);
        } else {
            weather.setCity(args.join(" "));
        }

        weather.getAllWeather((err, wReport) => {
            bot.createMessage(message.channel.id, {
                                                    "embed": {
                                                        "title": "Tomoko's Weather Report",
                                                        "description": "W-Weather report f-for " + args.join(" ") + ":",
                                                        "color": 16684873,
                                                        "footer": {
                                                            "icon_url": message.author.avatarURL,
                                                            "text": "Requested by: " + getUserName(message.member) + " | Powered by OpenWeatherMap"
                                                        },
                                                        "author": {
                                                            "name": "Tomoko Bot",
                                                            "icon_url": bot.user.avatarURL
                                                        },
                                                        "fields": [
                                                            {
                                                                "name": ":white_sun_rain_cloud: Weather",
                                                                "value": wReport.weather[0].description
                                                            },
                                                            {
                                                                "name": ":thermometer: Temperature",
                                                                "value": wReport.main.temp + "°C",
                                                                "inline": true
                                                            },
                                                            {
                                                                "name": ":droplet: Humidity",
                                                                "value": wReport.main.humidity + "%",
                                                                "inline": true
                                                            },
                                                            {
                                                                "name": ":compass: Pressure",
                                                                "value": wReport.main.pressure + "hPa",
                                                                "inline": true
                                                            },
                                                            {
                                                                "name": ":cloud_rain: Rain Volume (3h)",
                                                                "value": (wReport.rain ? wReport.rain["3h"] : "[Unmeasured] ") + "mm",
                                                                "inline": true
                                                            },
                                                            {
                                                                "name": ":cloud: Cloudiness",
                                                                "value": wReport.clouds.all + "%",
                                                                "inline": true
                                                            },
                                                            {
                                                                "name": ":dash: Wind Speed",
                                                                "value": wReport.wind.speed + "m/s",
                                                                "inline": true
                                                            }
                                                        ]
                                                    }
                                                });
        });
    } else {
        invalidArgs(message, message.author, message.content.split(" ")[0]);
    }
};

module.exports.options = {
    "cooldown": 60000,
    "cooldownMessage": messages.cooldown,
    "cooldownReturns": 5
};
