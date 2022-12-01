package com.sns.sns_bff.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SongDto {

    Long songId;

    String songName;

    Long albumId;

    String albumName;

    Long performerId;

    String performerName;

    String url;

    Integer duration;

    String text;

}
