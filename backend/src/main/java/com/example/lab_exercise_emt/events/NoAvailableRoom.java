package com.example.lab_exercise_emt.events;

import com.example.lab_exercise_emt.model.Accommodation;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;

@Getter
public class NoAvailableRoom extends ApplicationEvent {

    private LocalDateTime when;

    public NoAvailableRoom(Accommodation source) {
        super(source);
        this.when = LocalDateTime.now();
    }

    public NoAvailableRoom(Accommodation source, LocalDateTime when) {
        super(source);
        this.when = when;
    }
}

